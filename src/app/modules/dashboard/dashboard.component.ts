import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ObjectModalComponent } from '@shared/components/object-modal/object-modal.component';
import { Task } from '@shared/models/task.model';
import { AuthService } from '@shared/services/auth.service';
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

    public dialog: MatDialog
  ) {
    this.tasks$ = this.tasksService.tasks$;
  }

  ngOnInit(): void {
  }

  async createTask(event: any): Promise<void> {
    const title = event.target.value;
    event.target.value = '';

    if (event.key === 'Enter') {
      const task = { title, done: false };
      await this.tasksService.createTask(task);
    }
  }

  clearTask(task: Task) {
    this.tasksService.clearTask(task.id);
  }

  updateTask(task: Task) {
    this.tasksService.updateTask(task);
  }

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(ObjectModalComponent, {
      data: {
        object: task,
        type: 'task'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'delete') {
        this.tasksService.deleteTask(task.id);
      } else if (result?.event === 'save') {
        this.tasksService.updateTask(result.task)
      }
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
