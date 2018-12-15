import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TourService {

	constructor(private http: HttpClient) { }

	private apiUrl = environment.API_URL;

	getTour(tourCode): Observable<any> {
		return this.http.get(this.apiUrl + 'tours/' + tourCode);
	}

	/* Temporary function to start tour */
	updateTour(tourCode, updateData): Observable<any> {

		return this.http.put(this.apiUrl + 'tours/' + tourCode, updateData);
	}
}
