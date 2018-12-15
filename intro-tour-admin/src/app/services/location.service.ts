import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
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

	public createLocation(data: object | Array<object>): Observable<any>{
		return this.http.post(this.apiUrl + 'locations', data);
	}

	public getLocations(): Observable<any>{
		return this.http.get(this.apiUrl + 'locations');
	}

	public deleteLocation(id): Observable<any>{
		return this.http.delete(this.apiUrl + 'locations/' + id);
	}
}