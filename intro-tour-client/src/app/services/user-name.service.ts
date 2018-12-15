import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocalstorageService } from './localstorage.service';
import { User } from '../user';

@Injectable()
export class UserNameService {

	constructor(private storage: LocalstorageService) { }

	private user: User = this.storage.getItem('user');

	private userNameSource = new BehaviorSubject<string>(this.user ? this.user.name : 'No Name');
	currentName = this.userNameSource.asObservable();

	private userIdSource = new BehaviorSubject<number>(0);
	currentId = this.userIdSource.asObservable();

	newName(name: string) {
		this.userNameSource.next(name);
	}

	userId(usr) {
		let id = usr.id;
		this.userIdSource.next(id);
	}
}
