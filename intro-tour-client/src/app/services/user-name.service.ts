import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class UserNameService {

  private userNameSource = new BehaviorSubject<string>('John Doe');
  currentName = this.userNameSource.asObservable();

  private userIdSource = new BehaviorSubject<number>(0);
  currentId = this.userIdSource.asObservable();

  constructor() { }

  newName(name: string) {
    this.userNameSource.next(name);
  }

  userId(usr){
    let id = usr.id;
    this.userIdSource.next(id);
  }
}
