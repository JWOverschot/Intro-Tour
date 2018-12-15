import { Component, OnInit } from '@angular/core';
import { Player } from '../../player';
import { UserNameService } from '../../services/user-name.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { MessageTypes } from 'src/app/message-types';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	constructor(
		private username: UserNameService,
		private router: Router,
		private localstorageService: LocalstorageService,
		private messagesServices: MessagesService
	) { }

	name

	player: Player = {
		name: "",
		tour_id: null,
		player_id: null
	}

	ngOnInit() {
		if (this.localstorageService.getItem('user') !== null) {
			this.router.navigateByUrl("/home");
		} else {
			this.localstorageService.clear();
		}
		this.username.currentName.subscribe(name => this.player.name = name);
	}

	goToPage(page) {
		this.messagesServices.closeMessage();
		if (this.name != undefined) {
			this.username.newName(this.name);
			this.router.navigateByUrl(page);
		} else {
			this.messagesServices.setMessage(MessageTypes.Error, 'Oeps', 'Naam niet ingevuld! vul A.U.B. een naam in');
		}
	}

	get Player() {
		return this.player;
	}

}
