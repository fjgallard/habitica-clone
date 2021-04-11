import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '@shared/models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: Observable<Task[]>;

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {
    this.sessionService.user$.pipe(
      tap(user => {
        if (user) {
          this.getTasks(user.id);
        }
      })
    );
  }

  private getTasks(user: string): void {
    this.tasks$ = this.firestore.collection<Task>('tasks', ref => ref.where('user', '==', user)).valueChanges({ idField: 'id' });
  }
}
