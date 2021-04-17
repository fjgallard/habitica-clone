import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '@shared/models/task.model';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { SessionService } from './session.service';

import { switchMap, tap } from 'rxjs/operators';
import { User } from '@shared/models/user.model';
import { CreateTaskData } from '@shared/lib/create-task.data';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  user: User;
  tasks$: Observable<Task[]>;

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {
    this.tasks$ = this.sessionService.user$.pipe(
      switchMap(user => this.initTasks(user))
    );
  }

  createTask(createTaskData: CreateTaskData): Promise<any> {
    const task = {
      ...createTaskData,
      user: this.user.id
    };

    return this.firestore.collection<Task>('tasks').add(task);
  }

  clearTask(taskId: string): Promise<void> {
    return this.firestore.doc<Task>(`tasks/${taskId}`).delete();
  }

  private setUser(user: User): void {
    this.user = user;
  }

  private initTasks(user: User): Observable<Task[]> {
    if (!user) {
      return from([]);
    }
    this.user = user;

    return this.firestore.collection<Task>('tasks', ref => ref.where('user', '==', user.id)).valueChanges({ idField: 'id' });
  }
}
