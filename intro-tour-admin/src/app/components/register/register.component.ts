import {Component, OnInit} from '@angular/core';
import {AdminLoginService} from "../../service/admin-login.service";
import * as $ from "jquery";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private adminLoginService: AdminLoginService) {
    }

    ngOnInit() {
        //
    }

    registerTo() {
        let data = {
            username: $("input[name = 'username']").val(),
            email: $("input[name = 'e-mail']").val(),
            password: $("input[name = 'password']").val(),
            cPassword: $("input[name = 'cPassword']").val()
        };
        this.adminLoginService.SendTo(data, "register");

    }
}
