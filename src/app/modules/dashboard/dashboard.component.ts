import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ObjectModalComponent } from '@shared/components/object-modal/object-modal.component';
import { Reward } from '@shared/models/reward.model';
import { Task } from '@shared/models/task.model';
import { User } from '@shared/models/user.model';
import { AuthService } from '@shared/services/auth.service';
import { RewardsService } from '@shared/services/rewards.service';
import { SessionService } from '@shared/services/session.service';
import { TasksService } from '@shared/services/tasks.service';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks$: Observable<Task[]>;
  rewards$: Observable<Reward[]>
  user$: Observable<User>;

  constructor(
    private router: Router,

    private authService: AuthService,
    private userService: UserService,
    private tasksService: TasksService,
    private rewardService: RewardsService,

    public dialog: MatDialog
  ) {
    this.tasks$ = this.tasksService.openTasks$;
    this.rewards$ = this.rewardService.rewards$;
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
  }

  // Task Functions
  async createTask(event: any): Promise<void> {
    const name = event.target.value;

    if (event.key === 'Enter') {
      const task = { name, done: false };
      event.target.value = '';
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
        this.tasksService.updateTask(result.object)
      }
    });
  }

  // Reward Functions
  async createReward(event: any): Promise<void> {
    const name = event.target.value;

    if (event.key === 'Enter') {
      const reward = { name };
      event.target.value = '';
      await this.rewardService.createReward(reward);
    }
  }

  openRewardDialog(reward: Reward): void {
    const dialogRef = this.dialog.open(ObjectModalComponent, {
      data: {
        object: reward,
        type: 'reward'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'delete') {
        this.rewardService.deleteReward(reward.id);
      } else if (result?.event === 'save') {
        this.rewardService.updateReward(result.object);
      }
    });
  }


  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
