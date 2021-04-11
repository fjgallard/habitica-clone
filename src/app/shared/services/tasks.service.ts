import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '@shared/models/task.model';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { SessionService } from './session.service';

import { switchMap, tap } from 'rxjs/operators';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: Observable<Task[]>;

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {
    this.tasks$ = this.sessionService.user$.pipe(
      switchMap(user => this.getTasks(user))
    );
  }

  private getTasks(user: User): Observable<Task[]> {
    if (!user) {
      return from([]);
    }

    return this.firestore.collection<Task>('tasks', ref => ref.where('user', '==', user.id)).valueChanges({ idField: 'id' });
  }
}
