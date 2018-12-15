import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserNameService } from '../../services/user-name.service';
import { TeamService } from '../../services/team.service';
import { MessageTypes } from '../../message-types';
import { MessagesService } from '../../services/messages.service';
import { TourService } from '../../services/tour.service';
import { ParticipantsService } from '../../services/participants.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Player } from '../../player';
import { Team } from '../../team';
import { User } from '../../user';

import * as $ from 'jquery';

@Component({
	selector: 'app-team-create',
	templateUrl: './team-create.component.html',
	styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

	constructor(
		private router: Router,
		private userName: UserNameService,
		private teamService: TeamService,
		private messagesServices: MessagesService,
		private tourService: TourService,
		private participantService: ParticipantsService,
		private localStorage: LocalstorageService,
	) { }

	player: Player = {
		name: '',
		tour_id: null,
		player_id: null
	}
	team: Team = {
		team_name: '',
		tour_id: null,
		team_leader: null,
		team_pin: ''
	}
	public user: User = {
		name: '',
		role: '',
		team_id: null
	}
	private teamId: number;
	private formFieldErrors: boolean = true;

	private addLoader() { $('.ui.loader').parent().addClass(['active', 'dimmer']) };
	private removeLodaer() { $('.ui.loader').parent().removeClass(['active', 'dimmer']); this.router.navigateByUrl('/home'); };

	private errorHandler() {
		if (this.team.team_name == "" || this.team.tour_id == null) {
			//document.getElementById('error_message').classList.remove('hidden');
			if (this.team.team_name == "") {
				document.getElementById('name_input').classList.add('error');
				this.messagesServices.setMessage(MessageTypes.Error, 'Oeps', 'Het veld TEAM NAAM is verplicht');
			} else {
				document.getElementById('name_input').classList.remove('error');
				this.formFieldErrors = false;
			}
			if (this.team.tour_id == null) {
				document.getElementById('tour_id_input').classList.add('error');
				this.messagesServices.setMessage(MessageTypes.Error, 'Oeps', 'Het veld TOUR ID is verplicht');
			} else {
				document.getElementById('tour_id_input').classList.remove('error');
				this.formFieldErrors = false;
			}
		} else {
			this.messagesServices.closeMessage();
			this.addLoader();
			this.formFieldErrors = false;
			this.checkTourId();
		}
	}

	// Check if tour exists
	private checkTourId() {
		if (this.formFieldErrors) {
			return;
		}
		if (this.team.tour_id !== null) {
			//this.http.get(this.apiUrl + 'tours/' + this.team.tour_id) old
			this.tourService.getTour(this.team.tour_id)
				.subscribe(
					(res: Response) => {
						this.createTeam();
						this.localStorage.setItem('tour', res[0]);
					},
					err => {
						this.removeLodaer();
						document.getElementById('tour_id_input').classList.add('error');
						this.messagesServices.setMessage(MessageTypes.Error, 'Fout', 'Tour ID bestaat niet');
						console.error(err);
					}
				);
		}
	}

	// Post call to create a new team
	private createTeam() {
		if (this.formFieldErrors) {
			return;
		}
		this.teamService.teamName(this.team.team_name);
		//this.http.post(this.apiUrl + 'teams', this.team) old
		this.teamService.createTeam(this.team)
			.subscribe(
				(res: Team) => {
					this.team.team_pin = res.team_pin;
					this.team.team_leader = null;
					this.createUser(res);
				},
				err => {
					console.error(err);
					this.removeLodaer();
					this.messagesServices.setMessage(MessageTypes.Error, 'Server Fout', 'Er is een fout met de server opgetreden');
				}
			);
	}

	// Post call to create new user
	private createUser(teamRes) {
		this.teamId = teamRes.id;
		this.user.team_id = teamRes.team_pin;
		this.user.name = this.player.name;
		//this.http.post(this.apiUrl + 'participants', this.user) old
		this.participantService.createUser(this.user)
			.subscribe(
				(res: Response) => {
					this.updateTeam(res);
					this.userName.userId(res);
				},
				err => {
					console.error(err);
					this.removeLodaer();
					this.messagesServices.setMessage(MessageTypes.Error, 'Server Fout', 'Er is een fout met de server opgetreden');
				}
			);
	}

	// Updates team to add the id of the team leader
	private updateTeam(userRes) {
		this.team.team_leader = userRes.id;
		//this.http.put(this.apiUrl + 'teams/' + this.teamId, {team_leader: this.team.team_leader}) old
		this.teamService.updateTeam(this.teamId, { team_leader: this.team.team_leader })
			.subscribe(
				(res: Response) => {
					this.sendTeamInfoToNextPage();
					this.removeLodaer();
					this.router.navigateByUrl('home');
				},
				err => {
					console.error(err);
					this.removeLodaer();
					this.messagesServices.setMessage(MessageTypes.Error, 'Server Fout', 'Er is een fout met de server opgetreden');
				}
			);
	}

	public createTeamAndUser() {
		this.messagesServices.closeMessage();
		this.errorHandler();
	}

	private sendTeamInfoToNextPage() {
		this.teamService.teamName(this.team.team_name);
		this.teamService.teamPin(this.team.team_pin);
	}

	ngOnInit() {
		$("input:text:visible:first").focus();
		this.userName.currentName.subscribe(name => this.player.name = name);
		if (this.player.name == 'John Doe' || this.player.name == undefined) {
			this.router.navigateByUrl('/login');
		} else {
			console.log(this.player);
		}
	}
}
