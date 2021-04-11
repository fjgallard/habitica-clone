import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  async googleLogin(): Promise<void> {
    await this.authService.googleLogin();
    this.router.navigateByUrl('/');
  }

}
