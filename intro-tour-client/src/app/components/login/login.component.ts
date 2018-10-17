import { Component, OnInit } from '@angular/core';
import { Player } from '../../player';
import { UserNameService } from '../../services/user-name.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private username: UserNameService, private router: Router, private localstorageService: LocalstorageService) { }

  name

  player: Player = {
    name: "",
    tour_id: null,
    player_id: null
  }

  ngOnInit() {
    this.localstorageService.clear();
    this.username.currentName.subscribe(name => this.player.name = name);
  }

  goToPage(page) {
    if (this.name != undefined) {
      this.username.newName(this.name);
      this.router.navigateByUrl(page);
    } else {
      alert('naam niet ingevuld! vul A.U.B. een naam in');
    }
  }

  get Player() {
    return this.player;
  }

}
