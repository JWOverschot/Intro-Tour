import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	private apiUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	/**
	 * getEvents
	 */
	public getEvents(): Observable<any> {
		return this.http.get(this.apiUrl + 'events');
	}

	public getEventsByTourId(id): Observable<any> {
		return this.http.get(this.apiUrl + 'events/' + id);
	}
}
