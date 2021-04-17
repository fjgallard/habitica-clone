import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '@shared/models/task.model';
import { from, Observable } from 'rxjs';
import { SessionService } from './session.service';

import { switchMap } from 'rxjs/operators';
import { User } from '@shared/models/user.model';
import { CreateTaskData } from '@shared/lib/create-task.data';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  user: User;
  tasks$: Observable<Task[]>;
  openTasks$: Observable<Task[]>;

  constructor(private firestore: AngularFirestore, private sessionService: SessionService) {
    this.tasks$ = this.sessionService.user$.pipe(
      switchMap(user => this.initTasks(user))
    );

    this.openTasks$ = this.sessionService.user$.pipe(
      switchMap(user => this.initOpenTasks(user))
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
    return this.firestore.doc<Task>(`tasks/${taskId}`).update({
      done: true
    });
  }

  updateTask(task: Task): Promise<void> {
    return this.firestore.doc<Task>(`tasks/${task.id}`).update({
      ...task
    });
  }

  deleteTask(taskId: string): Promise<void> {
    return this.firestore.doc<Task>(`tasks/${taskId}`).delete();
  }

  private initTasks(user: User): Observable<Task[]> {
    if (!user) {
      return from([]);
    }
    this.user = user;

    return this.firestore.collection<Task>('tasks', ref => ref.where('user', '==', user.id)).valueChanges({ idField: 'id' });
  }

  private initOpenTasks(user: User): Observable<Task[]> {
    if (!user) {
      return from([]);
    }
    this.user = user;

    return this.firestore.collection<Task>('tasks', ref => ref
      .where('user', '==', user.id)
      .where('done', '==', false))
    .valueChanges({ idField: 'id' });
  }
}
