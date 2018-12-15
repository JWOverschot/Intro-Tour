import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retryWhen } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class QuestionService {
	private apiUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	public getQuestion(id: number): Observable<any> {
		return this.http.get(this.apiUrl + 'questions/' + id)
			.pipe(
				retryWhen((errors) => {
					return errors
				})
			);
	}
}
