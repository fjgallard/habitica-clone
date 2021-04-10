import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user$: Observable<User>;

  private $user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor() {
    this.user$ = this.$user.asObservable();
  }

  setCurrentUser(user: User): void {
    return this.$user.next(user);
  }
}
