import { Component, OnInit } from '@angular/core';
import {AdminLoginService} from "../../service/admin-login.service";
import * as $ from "jquery";
import {environment} from "../../../../../intro-tour-client/src/environments/environment";


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

    private apiUrl: string = environment.API_URL;

    constructor(private adminLoginService: AdminLoginService) {}

    ngOnInit() {
        //
    }

    loginTo() {
        let data = {
            email: $("input[name = 'e-mail']").val(),
            password: $("input[name = 'password']").val()
        };
        this.adminLoginService.loginTo(data);
    }

}
