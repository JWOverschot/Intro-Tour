import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ScoreService } from '../../services/score.service';
import { Team } from '../../team';
import { SCORES } from '../../mock-scores';

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
	constructor(private http: HttpClient, private router: Router, private scoreService: ScoreService) {
		// Temporary for mock data
		let scoresArray: Array<number>;

		SCORES.sort((a, b) => (a.team_score < b.team_score) ? 1 : ((b.team_score < a.team_score) ? -1 : 0));
	}

	public stockQuote: Team;
	private subscription: Subscription;

	private apiUrl: string = 'http://intro-tour.local/api/';
	public tableData: any = SCORES;
	private tourID: number = 1;
	private teams$: Observable<Team>;

	private sortArrayByScore(teams) {
		teams.sort((a, b) => (a.team_score < b.team_score) ? 1 : ((b.team_score < a.team_score) ? -1 : 0));
		this.tableData = teams;
	}

	ngOnInit() {
		// this.subscription = this.scoreService.getTeamsByTourID().subscribe(quote => {
		// 	this.stockQuote = quote;
		// });

		//this.teams$ = this.scoreService.getTeamsByTourID(this.tourID);
		//this.sortArrayByScore(this.teams$);
	}

	ngOnDestroy() {
		// this.subscription.unsubscribe();
	}

}
