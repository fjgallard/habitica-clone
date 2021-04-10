import firebase from 'firebase/app';
import { User } from '../models/user.model';

export class AuthHelper {

  static convertFsUser(fsUser: firebase.User): User {
    const user: User = {
      id: fsUser.uid,
      name: fsUser.displayName,
      email: fsUser.email,
      photoURL: fsUser.photoURL
    };

    return user;
  }
}
