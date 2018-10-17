import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://intro-tour.local/api/';

  getTour(tourId): Observable<any> {
    return this.http.get(this.apiUrl + 'tours/' + tourId);
  }
}
