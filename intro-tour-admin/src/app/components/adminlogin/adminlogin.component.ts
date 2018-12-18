import { Component, OnInit } from '@angular/core';
import {AdminLoginService} from "../../service/admin-login.service";
import * as $ from "jquery";


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

    constructor(private adminLoginService: AdminLoginService) {}

    ngOnInit() {
        //
    }

    loginTo() {
        let data = {
            email: $("input[name = 'e-mail']").val(),
            password: $("input[name = 'password']").val()
        };
        this.adminLoginService.SendTo(data, "login");
    }
}
