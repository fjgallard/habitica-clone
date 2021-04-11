import { Injectable } from '@angular/core';
import { TasksService } from '@shared/services/tasks.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private tasksService: TasksService) { }
}
