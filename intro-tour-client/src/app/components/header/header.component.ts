import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TeamService } from 'src/app/services/team.service';
import { TourService } from 'src/app/services/tour.service';
import { TimerService } from 'src/app/services/timer.service';
import { Tour } from '../../tour';

import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(private localstorageService: LocalstorageService, private teamService: TeamService, private tourService: TourService, private timerService: TimerService) { }

	private tour: Tour;
	public teamName;
	public timeLimit: number;
	public timeRemaining: number = 0;
	private timer;
	public timerOnPage: number = 0;

	private getTour(tourCode: string) {
		this.tourService.getTour(tourCode).subscribe((res) => {
			this.tour = res[0];
			this.startTimer();
		});
	}

	// Timer functions
	private startTimer() {
		// set time up to false
		this.timerService.newTimeUpStatus(false);

		this.timeLimit = this.tour.time_limit;
		let timeOfstart = this.tour.time_start;
		let timeNow = moment.utc(timeOfstart);
		let timeEnd = timeNow.add(this.timeLimit, "seconds").unix();
		this.timeRemaining = this.timeLimit;

		let timerEle = $('#tour-timer');

		if (timeOfstart === null) {
			return this.timerOnPage = this.timeLimit;
		}

		this.timer = setInterval(() => {
			if (this.timeRemaining <= 0) {
				clearInterval(this.timer);
				this.tourDone();
			}

			this.timeRemaining = moment.unix(timeEnd).utc().diff(moment.utc(), 'seconds');

			this.timerTextColor(timerEle);

			return this.timerOnPage = this.timeRemaining;
		}, 500);
	}
	private stopTimer() {
		clearInterval(this.timer);
	}

	private timerTextColor(timerEle) {
		// 10% left on timer
		if (this.timeRemaining <= (10 / 100) * this.timeLimit) {
			// orange
			timerEle.css('color', 'var(--ui-orange)');
		}
		// 5% left on timer
		if (this.timeRemaining <= (5 / 100) * this.timeLimit) {
			// red
			timerEle.css('color', 'var(--ui-red)');
		}
		// 1% left on timer
		if (this.timeRemaining <= (5 / 100) * this.timeLimit) {
			//blink red
			timerEle.addClass('blinker');
		}
	}

	private tourDone() {
		this.timerService.newTimeUpStatus(true);
	}

	ngOnInit() {
		//teamname in header
		setTimeout(() => {
			if (this.localstorageService.getItem('team') == null) {
				this.teamService.teamName('INTRO TOUR');
				this.teamService.currentTeamName.subscribe(name => this.teamName = name);
			} else {
				this.teamName = this.localstorageService.getItem('team').team_name;
			}
			if (this.localstorageService.getItem('team')) {
				this.getTour(this.localstorageService.getItem('team').tour_id);
			}
		}, 100);
	}

}
