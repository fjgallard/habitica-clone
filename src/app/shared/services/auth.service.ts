import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AuthHelper } from '../helper/auth.helper';
import { SessionService } from './session.service';

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

  async logout(): Promise<void> {
    return this.fireauth.signOut();
  }
}
