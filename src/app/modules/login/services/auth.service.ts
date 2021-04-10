import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import { AuthHelper } from 'src/app/shared/helper/auth.helper';

import { SessionService } from 'src/app/shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private sessionService: SessionService
  ) { }

  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireauth.signInWithPopup(provider);

    const user = AuthHelper.convertFsUser(credential.user);
    return this.sessionService.setCurrentUser(user);
  }
}
