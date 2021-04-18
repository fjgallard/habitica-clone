import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<User>;

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {
    this.user$ = this.sessionService.user$.pipe(
      switchMap(user => this.firestore.doc<User>(`users/${user.id}`).valueChanges({idField: 'id'}))
    );
  }

  deductGold(cost: number, currentGold: number, userId: string) {
    const gold = currentGold - cost;
    return this.firestore.doc<User>(`users/${userId}`).update({ gold });
  }

  grantGold(goldReward: number, currentGold: number, userId: string) {
    const gold = currentGold + goldReward;
    return this.firestore.doc<User>(`users/${userId}`).update({ gold });
  }
}
