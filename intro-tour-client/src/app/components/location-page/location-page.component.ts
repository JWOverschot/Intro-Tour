import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { QuestionService } from '../../services/question.service';
import { LocationService } from '../../services/location.service';
import { TeamService } from '../../services/team.service';
import { LocalstorageService } from '../../services/localstorage.service'
import { HintService } from '../../services/hint.service';
import { TimerService } from 'src/app/services/timer.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Hint } from '../../hint';
import { MessageTypes } from 'src/app/message-types';

@Component({
	selector: 'app-location-page',
	templateUrl: './location-page.component.html',
	styleUrls: ['./location-page.component.css']
})
export class LocationPageComponent implements OnInit {
	z: number;
	icons: Array<any>;
	private given_answer;
	public question;
	public locations = [];
	public answerd = [];
	public hints_bougth = [];
	public totalPoints: number = 0;
	public timeLimit: number;
	public timeRemaining: number = 0;
	private timer;
	public showOpenQuestionButton: boolean;
	public hint: Hint = {
		cost: 0,
		hint: '',
		event_id: null,
		id: null,
		is_bougth: null
	};
	public hintText: string = '';

	ky; kx; dy; dx; km;

	public events;

	curLocation = {
		id: null,
		x: null,
		y: null
	}

	options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	}

	isTracking = false;

	constructor(
		private _eventService: EventService,
		private _questionService: QuestionService,
		private _locationService: LocationService,
		private teamService: TeamService,
		private localstorageService: LocalstorageService,
		private hintService: HintService,
		private timerService: TimerService,
		private messagesServices: MessagesService,
	) {
		this.getEvents();
	}


	ngOnInit() {
		this.timerService.timeUp.subscribe(showOpenQuestionButton => this.showOpenQuestionButton = showOpenQuestionButton ? false : true);

		if (this.isTracking == false) {
			this.trackMe();
		}

		this.z = 18;
		this.icons = [
			{
				url: '/assets/images/marker.png',
				scaledSize: { height: 40, width: 40 }
			},
			{
				url: '/assets/images/marker-q.png',
				scaledSize: { height: 40, width: 40 }
			},
			{
				url: '/assets/images/marker-q-done.png',
				scaledSize: { height: 40, width: 40 }
			}
		];
	}

	//de gebruiker zijn locatie ophalen en laten zien op de kaart
	private trackMe() {
		if (navigator.geolocation) {
			this.isTracking = true;
			navigator.geolocation.watchPosition(
				(position) => { this.showTrackingPosition(position); },
				(err) => { console.error('ERROR(' + err.code + '): ' + err.message); },
				{ maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
			);
		} else {
			this.messagesServices.setMessage(MessageTypes.Error, 'Oeps', 'Je locatie kan helaas niet worden gevonden');
		}
	}

	public showTrackingPosition(position) {
		this.curLocation.x = position.coords.latitude;
		this.curLocation.y = position.coords.longitude;
	}

	//check of je in de radius van de vraag bent (d.m.v de stelling van pithagoras)
	public arePointsNear(location) {
		this.km = location.radius.data / 1000;

		this.ky = 40000 / 360;
		this.kx = Math.cos(Math.PI * location.latitude / 180.0) * this.ky;

		this.dx = Math.abs(location.longitude - this.curLocation.y) * this.kx;
		this.dy = Math.abs(location.latitude - this.curLocation.x) * this.ky;

		return Math.sqrt(this.dx * this.dx + this.dy * this.dy) <= this.km;
	}


	public showWindow(location) {
		let team = this.localstorageService.getItem('team');
		this._questionService.getQuestion(location.question_id)
			.subscribe((question) => {
				this.question = question[0];
				this.startTimer(location.id);
				document.getElementById(`popup-${location.id}`).style.display = 'block';

				this.hintService.getHint(location.id)
					.subscribe((res) => {
						this.hint = res[0];
						if (team.hints_bougth.includes(location.id)) {
							this.hideHintButtonShowHint(location.id);
						}
					},
						(err) => {
							console.error(err);
						});


			});
	}

	public hideHintButtonShowHint(id) {
		document.getElementById(`buy-hint-${id}`).style.display = 'none';
		document.getElementById(`hint-box-${id}`).style.display = 'block';
	}

	public hideWindow(id) {
		document.getElementById(`popup-${id}`).style.display = 'none';
	}

	//alle events ophalen
	public getEvents() {
		let tour = this.localstorageService.getItem('tour');

		this._eventService.getEventsByTourId(tour.id)
			.subscribe((res: any) => {
				this.getLocation(res);
			});
	}
	//vraag bij een event ophalen
	public getQuestion(id) {
		this._questionService.getQuestion(id).subscribe(question => this.question = question[0]);
	}
	//de locatie van elk event krijgen
	public getLocation(events) {
		events.forEach(event => {
			this._locationService.getLocation(event.event.trigger.data.location_id)
				.subscribe((res: any) => {
					if (this.localstorageService.getItem('team') != null) {
						let questions_answerd_team = this.localstorageService.getItem('team').questions_answerd;
						this.answerd = questions_answerd_team;

						if (questions_answerd_team != undefined) {
							if (questions_answerd_team.includes(event.event.action.data.question_id)) {
								res[0].map_icon = 2;
							} else {
								res[0].map_icon = 1;
							};
						} else {
							res[0].map_icon = 1;
						}
					} else {
						res[0].map_icon = 1;
					}

					this.timeLimit = event.event.action.data.timeLimit;

					res[0].question_id = event.event.action.data.question_id;
					res[0].points = event.event.action.data.points;
					res[0].devider = event.event.action.data.devider;
					res[0].latitude = parseFloat(res[0].latitude);
					res[0].longitude = parseFloat(res[0].longitude);

					this.locations.push(res[0]);

				});
		});
	}

	//answer handling
	public checkAnswer(id: number) {
		this.stopTimer();
		if (this.given_answer == undefined) {
			this.hideWindow(id);
			document.getElementById(`wrong-${id}`).style.display = 'block';
		} else if (this.given_answer == 1) {
			this.hideWindow(id);
			document.getElementById(`right-${id}`).style.display = 'block';
		} else {
			this.hideWindow(id);
			document.getElementById(`wrong-${id}`).style.display = 'block';
		}
	}

	public updateTeam(id: number) {
		let team = this.localstorageService.getItem('team');

		//update team score and the questions that are answerd
		this.locations.forEach((location, index) => {
			if (location.id == id) {
				team.team_score = team.team_score += this.locations[index].points;
				this.answerd.push(location.question_id);

				team.questions_answerd = this.answerd;

				this.localstorageService.updateItem('team', team);
				this.teamService.updateTeam(team.id, { team_score: team.team_score, questions_answerd: this.answerd })
					.subscribe((res: Response) => { },
						(err) => console.error(err));
			}
		});
	}

	public setValue(answer) {
		this.given_answer = answer;
	}

	public tryAgain(location) {
		this.locations.forEach((array_location, index) => {
			if (array_location.id == location.id) {
				this.locations[index].points = Math.round((this.locations[index].points / this.locations[index].devider));
			}
		});
		this.closeModal(location.id, 'wrong');
		this.showWindow(location)
	}
	public close(id: number) {
		this.closeModal(id, 'wrong');
		this.closeModal(id, 'right');
		if (this.given_answer == 0 || this.given_answer == undefined) {
			this.locations.forEach((location, index) => {
				if (location.id == id) {
					this.locations[index].points = 0;
				}
			});
		}
		this.resetHint();
		this.changeMarker(id);
		this.updateTeam(id);
		this.given_answer = undefined;
	}

	public resetHint() {
		this.hintText = '';
		this.hint = {
			cost: 0,
			hint: '',
			event_id: 0,
			id: null,
			is_bougth: null
		}
	}

	public closeModal(id: number, element: string) {
		document.getElementById(`${element}-${id}`).style.display = 'none';
	}
	private changeMarker(id: number) {
		this.locations.forEach((location, index) => {
			if (location.id == id) {
				this.locations[index].map_icon = 2;
			}
		});
	}

	private startTimer(locationId: number) {
		let timeNow: number = Math.round((new Date()).getTime() / 1000);
		let timeEnd: number = timeNow + this.timeLimit;
		this.timeRemaining = this.timeLimit;

		this.timer = setInterval(() => {
			if (this.timeRemaining <= 0) {
				clearInterval(this.timer);
				this.checkAnswer(locationId);
			}

			return this.timeRemaining = timeEnd - Math.round((new Date()).getTime() / 1000);
		}, 500);
	}
	private stopTimer() {
		clearInterval(this.timer);
	}


	public showAreYouSureWindow(id: number) {
		this.resetHint();
		document.getElementById(`sure-${id}`).style.display = 'block';
		this.hintService.getHint(id)
			.subscribe((res) => this.hint = res[0]);
	}

	public buyHint() {
		let team = this.localstorageService.getItem('team');

		if (team.team_score - this.hint.cost < 0) {
			console.error('Je hebt niet genoeg punten om een hint te kopen');
			this.closeModal(this.hint.event_id, 'sure');
		} else {
			this.closeModal(this.hint.event_id, 'sure');

			this.hints_bougth.push(this.hint.event_id);

			team.team_score = team.team_score - this.hint.cost;
			team.hints_bougth = this.hints_bougth;

			this.teamService.updateTeam(team.id, { team_score: team.team_score, hints_bougth: this.hints_bougth })
				.subscribe(
					(res: Response) => {
						this.localstorageService.updateItem('team', team);
						document.getElementById(`buy-hint-${this.hint.event_id}`).style.display = 'none';
						document.getElementById(`hint-box-${this.hint.event_id}`).style.display = 'block';
					},
					(err) => console.error(err)
				);

		}
	}
}
