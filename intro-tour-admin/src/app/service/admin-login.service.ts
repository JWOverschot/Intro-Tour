import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from "../../../../intro-tour-client/src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class AdminLoginService {

    private apiUrl: string = environment.API_URL;

    constructor(
        private http: HttpClient,
        private route: Router,
    ) {
    }

    SendTo(data, locate) {
        const httpData = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        JSON.stringify(data);

        if (locate == "login") {
            locate = "loginRequest";
        } else if (locate == "register") {
            locate = "registerRequest";
        }
        console.log(locate);
        return this.http.post(this.apiUrl + locate, data, httpData).subscribe(
            res => {
                localStorage.setItem('currentUser', JSON.stringify({token: res.success.token}));
                this.route.navigateByUrl('/');
            },
            err => {
                console.log("Error occured");
            }
        );
    }
}
