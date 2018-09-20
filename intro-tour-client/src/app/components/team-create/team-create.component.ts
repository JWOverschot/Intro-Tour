import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserNameService } from '../../services/user-name.service'
import { Team } from '../../team';
import { User } from '../../user';
 
import * as $ from 'jquery';

@Component({
	selector: 'app-team-create',
	templateUrl: './team-create.component.html',
	styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

	constructor(private http: HttpClient, private userName: UserNameService) { }
	
	public team: Team = {
		team_name: '',
		tour_id: null,
		team_leader: 0,
		team_pin: 1234
	}
	public user: User = {
		name: 'Klaas',
    role: 'master',
		team_id: null
	}
	private teamId: number;

	private apiUrl: string = 'http://intro-tour.local/api/';
	private addLoader() {$('.ui.loader').parent().addClass(['active', 'dimmer'])};
	private removeLodaer() {$('.ui.loader').parent().removeClass(['active', 'dimmer'])};

	private errorHandler() {
    if(this.team.team_name == "" || this.team.tour_id == null){
      document.getElementById('error_message').classList.remove('hidden');
      if(this.team.team_name == ""){
        document.getElementById('name_input').classList.add('error');
        
      }else{
        document.getElementById('name_input').classList.remove('error');
      }
      if(this.team.tour_id == null){
        document.getElementById('tour_id_input').classList.add('error');
      }else{
        document.getElementById('tour_id_input').classList.remove('error');
      }
    }else{
			this.addLoader();
		}
	}

	private hideComponent() {
		document.getElementById('error_message').classList.add('hidden');
      $('app-team-create div').animate({top: '100%', height: '0px'}, 500);
      setTimeout(() => {
        $('app-team-create').css('display', 'none');
      }, 500)      
	}

	// Check if tour exists
	private checkTourId() {
		this.http.get(this.apiUrl + 'tours/' + this.team.tour_id)
		.subscribe(
			(res:Response) => {
				this.createTeam();
			},
			err => {
				this.removeLodaer();
				document.getElementById('tour_id_input').classList.add('error');
				console.error("Error occured");
			}
		);
	}

	// Post call to create a new team
	private createTeam() {
		this.http.post(this.apiUrl + 'teams', this.team)
		.subscribe(
        (res:Response) => {
					this.createUser(res);
        },
        err => {
					console.error("Error occured");
					this.removeLodaer();
        }
      );
	}

	// Post call to create new user
	private createUser(teamRes) {
		this.teamId = teamRes.id;
		this.user.team_id = this.teamId;
		this.http.post(this.apiUrl + 'participants', this.user)
		.subscribe(
			(res:Response) => {
				this.updateTeam(res);
			},
			err => {
				console.error("Error occured");
				this.removeLodaer();
			}
		);
	}

	// Updates team to add the id of the team leader
	private updateTeam(userRes) {
		this.team.team_leader = userRes.id;
		console.log(this.team);
		this.http.put(this.apiUrl + 'teams/' + this.teamId, {team_leader: this.team.team_leader})
		.subscribe(
			(res:Response) => {
				this.hideComponent();
				this.removeLodaer();
			},
			err => {
				console.error("Error occured");
				this.removeLodaer();
			}
		);
	}

	public createTeamAndUser() {
		this.checkTourId();
		this.errorHandler();
	}
	
	ngOnInit() {
		// Subscribe to name service
		this.userName.currentName.subscribe(name => this.user.name = name);
	}
}
