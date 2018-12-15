import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { UserNameService } from '../../services/user-name.service';
import { ParticipantsService } from '../../services/participants.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { TourService } from '../../services/tour.service';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private teamService: TeamService,
		private userName: UserNameService,
		private participantsService: ParticipantsService,
		private localstorageService: LocalstorageService,
		private tourService: TourService,
		private route: Router
	) { }

	public teamPin: string;
	public totalMembers: number = 0;
	public name: string;
	public id: number;
	public team = {
		team_name: '',
		team_pin: '',
		questions_answerd: [],
		tour_id: null,
		team_leader: ''
	};
	public usr = {
		name: '',
		id: null
	};
	public members: Array<any>;

	/* Temporary function to start tour from game side of the application */
	public startTour() {
		let tour = this.localstorageService.getItem('tour');
		tour.time_start = moment().utc().format('YYYY-MM-DD HH:mm:ss');

		this.tourService.updateTour(tour.tour_code, tour).subscribe((res) => {
			console.log('succesfully started tour');
			this.localstorageService.setItem('tour', tour);
			location.reload();
		},
			err => {
				console.error(err);
			});
	}

	ngOnInit() {
		// Subscribe to team name from the team service

		if (this.id == 0) {
			this.route.navigateByUrl('/');
		}

		if (localStorage.getItem('user') == null) {
			this.userName.currentId.subscribe(id => this.id = id);
			this.teamService.currentTeamPin
				.subscribe((teamPin) => {
					this.localstorageService.setItem('teamPin', teamPin);
					this.teamPin = this.localstorageService.getItem('teamPin');
				});

			//check if user is set
			if (this.id == 0) {
				//redirect naar login pagina
				this.route.navigateByUrl('/');
			} else {
				//get user uit database
				this.participantsService.getUserById(this.id)
					.subscribe((res) => {
						//user opslaan in de loclastorage
						this.localstorageService.setItem('user', res[0]);
						this.usr = this.localstorageService.getItem('user')
					});
				this.teamService.getTeamByTeamPin(this.teamPin)
					.subscribe((res) => {
						//team opslaan in localstorage
						res[0].questions_answerd = [];
						res[0].hints_bougth = [];
						this.localstorageService.setItem('team', res[0]);
						this.team = this.localstorageService.getItem('team');
						this.teamService.teamName(res[0].team_name);
						this.tourService.getTour(this.team.tour_id)
							.subscribe((res) => {
								this.localstorageService.setItem('tour', res[0]);
							});
					});
				this.participantsService.getUsersByPin(this.teamPin)
					.subscribe((res) => {
						this.localstorageService.setItem('members', res);
						this.members = this.localstorageService.getItem('members');
						this.totalMembers = this.members.length;
					});
			}
		} else {
			//als de user al is opgeslagen in de localstorage
			this.teamPin = this.localstorageService.getItem('teamPin');
			this.usr = this.localstorageService.getItem('user');
			this.team = this.localstorageService.getItem('team');


			// temporary fix
			this.participantsService.getUsersByPin(this.teamPin)
				.subscribe((res) => {
					this.localstorageService.setItem('members', res);
					this.members = this.localstorageService.getItem('members');
					this.totalMembers = this.members.length;
				});
			//end temporary fix

			this.team.questions_answerd = [];
		}

	}

	getUsr() {
		console.log(this.team);
		console.log(this.usr);
	}
}