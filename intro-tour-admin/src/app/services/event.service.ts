import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getEventsById(id: number): Observable<any>{
    return this.http.get(this.apiUrl + 'events/' + id);
  }

  public createEvent(data): Observable<any>{
    return this.http.post(this.apiUrl + 'events', data);
  }

  public createEventTour(data): Observable<any>{
    return this.http.post(this.apiUrl + 'event-tour', data);
  }

  public deleteEventTour(id): Observable<any>{
    return this.http.delete(this.apiUrl + 'event-tour/' + id);
  }
}
