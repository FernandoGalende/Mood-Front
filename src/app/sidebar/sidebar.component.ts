import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private _router: Router, private _auth: AuthService) {}

  ngOnInit() {
    this._router.onSameUrlNavigation = 'reload';
  }

  isHrGroup() {
    if (this._auth.isAuthenticated()) {
      const groups = this._auth.getUserInfo()['<prodURl>']
        .groups;
      return groups && groups.includes('HR');
    }
    return false;
  }
}
