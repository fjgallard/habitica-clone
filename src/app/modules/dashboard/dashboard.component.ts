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

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(ObjectModalComponent, {
      data: {
        object: task,
        type: 'task'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
