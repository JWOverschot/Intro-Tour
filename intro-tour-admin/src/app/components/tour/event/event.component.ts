import { Component, OnInit } from '@angular/core';
// classes

import { Event } from 'src/app/event';
import { Location } from 'src/app/location';

//services
import { LocationService } from 'src/app/services/location.service';
import { AdminService } from 'src/app/services/admin.service';
import { EventService } from 'src/app/services/event.service';

import * as $ from 'jquery';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

	curPosition = {
		x: null,
		y: null
	}

	admin;

	chosen_lat = null;
	chosen_long = null;

	range = 12;
	name: string
	description: string

	events = [];

	location: Location = {
		name: undefined,
		description: undefined,
		radius: { "data": 12, "type": "circle" },
		latitude: undefined,
		longitude: undefined
	}


	constructor(
		private locationService: LocationService,
		private adminService: AdminService,
		private eventService: EventService
	) { }

	ngOnInit() {
		this.getLocation();
		this.getEventsByTour();
	}

	public dynamicSort(property) {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}


	public getEventsByTour() {
		this.events = [];
		// id is now static but has to be the one from the logged in admin
		this.adminService.getAdminById(1)
			.subscribe((admin) => {
				this.admin = admin[0];
				this.eventService.getEventsById(this.admin.tour.id)
					.subscribe((events) => {
						events.forEach(event => {
							this.locationService.getLocation(event.event.trigger.data.location_id)
								.subscribe((location) => {
									event.location = location[0];
									this.events.push(event);
								});
						});
					});
			});
	}

	public getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					this.curPosition.y = position.coords.longitude;
					this.curPosition.x = position.coords.latitude;
				},
				(err) => { console.error('ERROR(' + err.code + '): ' + err.message); },
				//{ maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
			);
		} else {
			alert("Je locatie kan helaas niet worden gevonden");
		}
	}

	public deleteLocation(id, event_id) {

		this.events.forEach((event, index) => {
			if (event.location.id == id) {
				this.events.splice(index, 1);

				this.eventService.deleteEventTour(event_id)
					.subscribe(() => { });

				this.locationService.deleteLocation(id)
					.subscribe(() => { });
			}
		});

	}

	public getLocationOnMap(event) {
		this.chosen_lat = event.coords.lat;
		this.chosen_long = event.coords.lng;
	}

	public saveLocation() {
		this.location.name = this.name;
		this.location.description = this.description;
		this.location.radius = { "data": this.range, "type": "circle" };
		this.location.latitude = this.chosen_lat;
		this.location.longitude = this.chosen_long;

		this.locationService.createLocation(this.location)
			.subscribe((location) => {

				let event: Event = {
					trigger: { "data": { "location_id": location.id }, "type": "location" },
					action: { "data": { "points": 500, "devider": 2, "timeLimit": 240, "question_id": 1 }, "type": "question" }
				}

				this.eventService.createEvent(event)
					.subscribe((made_event) => {

						let event_tour = {
							tour_id: this.admin.tour.id,
							event_id: made_event.id
						}

						this.eventService.createEventTour(event_tour)
							.subscribe(() => {
								this.name = undefined;
								this.description = undefined;
								this.getEventsByTour();
							});

					});

			}, (err) => { console.log(err) });
	}
}
