import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalstorageService {

	constructor() { }

	setItem(key: string, value: object | Array<object>) {
		localStorage.setItem(key, JSON.stringify(value));
	}
	getItem(key: string) {
		return JSON.parse(localStorage.getItem(key));
	}

	updateItem(key: string, value: object | Array<object>) {
		localStorage.removeItem(key);
		localStorage.setItem(key, JSON.stringify(value));
	}

	deleteItem(key: string) {
		localStorage.removeItem(key);
	}

	clear() {
		if (localStorage.length >= 1) {
			localStorage.clear();
		}
	}

}
