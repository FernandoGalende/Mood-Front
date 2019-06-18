import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IdToken } from '../interfaces/id-token';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  @Output() handleLogout: EventEmitter<void>;
  userInfo: IdToken;

  constructor(private _auth: AuthService, private _router: Router) {
    this.handleLogout = new EventEmitter<void>();
  }

  ngOnInit() {
    this.userInfo = this._auth.getUserInfo();
  }

  onLogout(event): void {
    this.handleLogout.emit();
    this._router.navigate(['logout']);
  }
}
