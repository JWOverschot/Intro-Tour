import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private apiUrl:string = 'http://intro-tour.local/api/';
  constructor(private http: HttpClient) { }

  getUserById(id): Observable<any>{
    return this.http.get(this.apiUrl + 'participants/' + id);
  }

  createUser(user): Observable<any>{
    return this.http.post(this.apiUrl + 'participants', user);
  }
}
