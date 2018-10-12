import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl:string = 'http://intro-tour.local/api/';

  private teamPinSource = new BehaviorSubject<any>('0000');
  public currentTeamPin = this.teamPinSource.asObservable();

  private teamNameSource = new BehaviorSubject<any>('INTRO TOUR');
  public currentTeamName = this.teamNameSource.asObservable();

  constructor(private http: HttpClient) { }

  public teamPin(teamPin: string) {
    this.teamPinSource.next(teamPin);
  }

  public teamName(teamName: string) {
    this.teamNameSource.next(teamName);
  }

  getTeamByTeamPin(pin): Observable<any>{
    return this.http.get(this.apiUrl + 'teams/' + pin);
  }
}
