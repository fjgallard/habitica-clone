import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CreateRewardData } from '@shared/lib/create-reward.data';
import { Reward } from '@shared/models/reward.model';
import { User } from '@shared/models/user.model';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  user: User;

  rewards$: Observable<Reward[]>;

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {
    this.rewards$ = this.sessionService.user$.pipe(
      switchMap(user => this.initRewards(user))
    );
  }

  createReward(rewardData: CreateRewardData) {
    const reward = {
      ...rewardData,
      cost: rewardData.cost || 5,
      user: this.user.id
    };

    return this.firestore.collection<Reward>('rewards').add(reward);
  }

  updateReward(reward: Reward): Promise<void> {
    return this.firestore.doc<Reward>(`rewards/${reward.id}`).update({
      ...reward
    });
  }

  deleteReward(rewardId: string): Promise<void> {
    return this.firestore.doc<Reward>(`rewards/${rewardId}`).delete();
  }

  private initRewards(user: User): Observable<Reward[]> {
    if (!user) {
      return from([]);
    }
    this.user = user;

    return this.firestore.collection<Reward>('rewards', ref => ref.where('user', '==', user.id)).valueChanges({ idField: 'id' });
  }

}
