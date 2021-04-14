import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '@shared/models/task.model';
import { AuthService } from '@shared/services/auth.service';
import { SessionService } from '@shared/services/session.service';
import { TasksService } from '@shared/services/tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tasksService: TasksService,
  ) {
    this.tasks$ = this.tasksService.tasks$;
  }

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  async createTask(event: any): Promise<void> {
    const title = event.target.value;

    if (event.key === 'Enter') {
      const task = {
        title,
        done: false,
      };

      await this.tasksService.createTask(task);
      event.target.value = '';
    }
  }

}
