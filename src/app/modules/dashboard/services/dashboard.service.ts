import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private authService: AuthService) { }
}
