import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ParticipantsService {

	private apiUrl: string = environment.API_URL;
	constructor(private http: HttpClient) { }

	getUserById(id): Observable<any> {
		return this.http.get(this.apiUrl + 'participants/' + id);
	}

	getUsersByPin(pin): Observable<any> {
		return this.http.get(this.apiUrl + 'teamparticipants/' + pin);
	}

	createUser(user): Observable<any> {
		return this.http.post(this.apiUrl + 'participants', user);
	}

	deleteUser(id): Observable<any> {
		return this.http.delete(this.apiUrl + 'participants/' + id);
	}
}
