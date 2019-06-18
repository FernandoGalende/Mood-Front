import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IdToken } from '../interfaces/id-token';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.scss']
})
export class MenuProfileComponent implements OnInit {
  @Output()
  profileMenu: EventEmitter<void>;
  @Output()
  handleLogout: EventEmitter<void>;
  @Output()
  profileLogout: EventEmitter<boolean>;

  userInfo: IdToken;

  constructor(private _auth: AuthService, private _router: Router) {
    this.profileMenu = new EventEmitter<void>();
    this.handleLogout = new EventEmitter<void>();
    this.profileLogout = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.userInfo = this._auth.getUserInfo();
  }

  hideMenu() {
    this.profileMenu.emit();
  }

  onLogout(event): void {
    this.profileLogout.emit(false);
    this.handleLogout.emit();
    this._router.navigate(['logout']);
  }
}
