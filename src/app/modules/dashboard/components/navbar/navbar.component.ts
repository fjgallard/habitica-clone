import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  @Output()
  logout = new EventEmitter();

  @Input()
  user: User;

  constructor() { }

  emitLogout(): void {
    this.logout.emit(true);
  }

  get gold() {
    return this.user?.gold || 0;
  }

}
