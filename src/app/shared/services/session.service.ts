import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthHelper } from '@shared/helper/auth.helper';
import { ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user$: Observable<User>;

  private $user: ReplaySubject<User> = new ReplaySubject();

  constructor(private fireauth: AngularFireAuth) {
    this.user$ = this.$user.asObservable();

    this.fireauth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        return this.setCurrentUser(AuthHelper.convertFsUser(user));
      }
      this.removeCurrentUser();
    });
  }

  getCurrentUser() {
  }

  private setCurrentUser(user: User): void {
    return this.$user.next(user);
  }

  private removeCurrentUser(): void  {
    return this.$user.next(null);
  }
}
