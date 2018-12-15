import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	private apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }
  
  public getAdminById(id:number): Observable<any>{
    return this.http.get(this.apiUrl + 'admins/' + id);
  }
}
