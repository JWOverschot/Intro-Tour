import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HintService {

  private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getHint(id): Observable<any> {
    return this.http.get(this.apiUrl + 'hints/' + id);
  }

  public updateHint(id, updateData): Observable<any>{
    return this.http.put(this.apiUrl + 'hints/' + id, updateData);
  }
}
