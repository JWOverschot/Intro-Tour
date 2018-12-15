import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
	providedIn: 'root'
})
export class TimerService {

	constructor() { }

	private timeUpSource = new BehaviorSubject<boolean>(false);
	timeUp = this.timeUpSource.asObservable();

	newTimeUpStatus(status: boolean) {
		this.timeUpSource.next(status);
	}
}
