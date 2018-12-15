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
	selector: 'app-team-join',
	templateUrl: './team-join.component.html',
	styleUrls: ['./team-join.component.css']
})
export class TeamJoinComponent implements OnInit {

	constructor(
		private router: Router,
		private userName: UserNameService,
		private teamService: TeamService,
		private messagesServices: MessagesService,
		private tourService: TourService,
		private participantService: ParticipantsService,
		private localStorage: LocalstorageService
	) { }

	private addLoader() { $('.ui.loader').parent().addClass(['active', 'dimmer']) };
	private removeLodaer() { $('.ui.loader').parent().removeClass(['active', 'dimmer']); this.router.navigateByUrl('/home'); };

	private errorHandler(message: string) {
		if (this.team.tour_id == null) {
			document.getElementById('tour_id_input').classList.add('error');
			this.messagesServices.setMessage(MessageTypes.Error, 'Oeps', message);
		} else {
			document.getElementById('tour_id_input').classList.remove('error');
		}
	}

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
	user: User = {
		name: '',
		role: '',
		team_id: null
	}

	ngOnInit() {
		$("input:text:visible:first").focus();
		this.userName.currentName.subscribe(name => this.player.name = name);
		if (this.player.name == 'John Doe' || this.player.name == undefined) {
			this.router.navigateByUrl('/login');
		}
	}

	public joinTeamCreateUser(team) {
		this.user.team_id = team[0].team_pin;
		this.user.name = this.player.name;

		this.getTourInfo(team);

		this.participantService.createUser(this.user).subscribe((res) => {
			this.userName.userId(res);
			this.sendTeamInfoToNextPage();
			this.removeLodaer();
		});
	}

	private getTourInfo(team) {
		this.tourService.getTour(team[0].tour_id).subscribe((res) => {
			this.localStorage.setItem('tour', res[0]);
		})
	}

	public checkIfTeamExists() {
		this.messagesServices.closeMessage();
		this.teamService.getTeamByTeamPin(this.team.team_pin).subscribe(
			(res: Response) => {
				if (res[0] != undefined) {
					this.messagesServices.closeMessage();
					this.addLoader();
					this.joinTeamCreateUser(res);
				} else {
					this.errorHandler('Het Team ID bestaat niet.');
				}
			},
			err => {
				this.errorHandler('Het veld Team Pin moet ingevuld worden');
			});
	}

	private sendTeamInfoToNextPage() {
		this.teamService.teamName(this.team.team_name);
		this.teamService.teamPin(this.team.team_pin);
	}
}
