import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private sessionService: SessionService) {
    this.sessionService.user$.subscribe(user => {
      console.log(user);
    });
  }

  ngOnInit(): void {
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }

}
