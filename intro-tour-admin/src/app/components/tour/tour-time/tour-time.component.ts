import { Component, OnInit } from '@angular/core';
import { Time } from 'src/app/time';
import { Tour } from 'src/app/tour';

import { TourService } from 'src/app/services/tour.service';

@Component({
	selector: 'app-tour-time',
	templateUrl: './tour-time.component.html',
	styleUrls: ['./tour-time.component.css']
})
export class TourTimeComponent implements OnInit {

	constructor(
		private tourService: TourService
	) { }

	public time: Time = {
		h: undefined,
		m: undefined,
		s: undefined,
		ms: undefined
	}

	private totalTime() {
		let time: Time = new Time;

		for (var key in this.time) {
			if (this.time.hasOwnProperty(key)) {
				if (this.time[key] === undefined || parseInt(this.time[key]) < 0 || this.time[key] === '') {
					time[key] = 0;
				}
				else {
					let thisTime = this.time[key].replace(/[^0-9]/g, '');
					time[key] = parseInt(thisTime);
				}
			}
		}
		return (time.h * 3600) + (time.m * 60);
	}

	public makeTour() {
		let tour: Tour = new Tour;

		tour = {
			name: 'Test Tour',
			description: 'New tour',
			team_limit: 5,
			time_limit: this.totalTime(),
			time_start: undefined,
			tour_code: 776655
		}

		this.tourService.createTeam(tour)
			.subscribe(
				(res: Response) => {
					console.log(res);
				},
				err => {
					console.error(err);
				});
	}

	ngOnInit() {
	}

}
