import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserNameService } from '../../services/user-name.service';
import { ParticipantsService } from 'src/app/services/participants.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { MessageTypes } from '../../message-types';

import * as $ from 'jquery';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	constructor(
		public userNameService: UserNameService,
		private user: ParticipantsService,
		private localStorage: LocalstorageService,
		private messagesServices: MessagesService,
		private route: Router
	) { }

	public userName: string;

	public toggleModal(elementId) {
		let ele = $('#' + elementId);

		if (ele.css('display') === 'none') {
			ele.css({ 'display': 'block' });
		}
		else {
			ele.css({ 'display': 'none' });
		}
	}

	public deleteCurrentUser() {
		this.messagesServices.closeMessage();
		let user = this.localStorage.getItem('user');

		this.user.deleteUser(user.id).subscribe(
			(res: Response) => {
				this.localStorage.deleteItem('user');
				this.route.navigateByUrl('/');
			},
			err => {
				console.error(err);
				this.messagesServices.setMessage(MessageTypes.Error, 'Server Fout', 'Er is een fout met de server opgetreden');
			}
		);
	}

	ngOnInit() {
		this.userNameService.currentName.subscribe(userName => this.userName = userName);
	}

}
