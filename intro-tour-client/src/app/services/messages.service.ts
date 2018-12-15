import { Injectable } from '@angular/core';
import { MessageTypes } from '../message-types';

import * as $ from 'jquery';

@Injectable({
	providedIn: 'root'
})
export class MessagesService {

	constructor() { }
	// Add custom message to page
	public setMessage(type: MessageTypes, title: string, message: string) {
		let cssClass: string;
		// add right css class
		switch (type) {
			case MessageTypes.Error:
				cssClass = 'error';
				break;
			case MessageTypes.Info:
				cssClass = 'info';
				break;
			case MessageTypes.Warning:
				cssClass = 'warning';
				break;
			case MessageTypes.Success:
				cssClass = 'success';
				break;
		}
		// Prevent messages from overlapping
		let topCss: string = '';
		if ($('.ui.message.generated').length > 0) {
			let topPx: number = 60 + ($('.ui.message.generated').outerHeight() * $('.ui.message.generated').length) + 5;
			topCss = 'top:' + topPx + 'px;';
		}

		// Mesage html template
		let htmlTemplate: string =
			`<div class="ui ${cssClass} message transition generated" style="${topCss} z-index: 1000001">
      <i class="close icon"></i>
      <div class="header">
        ${title}
      </div>
      <p>${message}</p>
    </div>`;

		// Insert message into page
		$(htmlTemplate).insertAfter('header');
		// Add jquery to close message
		$(".close.icon").click(function () {
			$(this).parent().remove();
		});
	}

	closeMessage() {
		var messages = Array.from(document.getElementsByClassName('message'));

		if (messages.length > 0) {
			messages.forEach((message) => {
				$('.' + message.classList[2]).remove();
			});
		}
	}
}
