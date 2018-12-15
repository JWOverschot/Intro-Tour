import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	private apiUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	public getLocation(id): Observable<any> {
		return this.http.get(this.apiUrl + 'locations/' + id);
	}
	public updateLocation(id: number, updateData): Observable<any>{
		return this.http.put(this.apiUrl + 'locations/' + id, updateData);
	}
}
