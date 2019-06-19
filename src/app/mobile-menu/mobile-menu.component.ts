import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Output()
  clickMenu: EventEmitter<void>;
  constructor(private _auth: AuthService) {
    this.clickMenu = new EventEmitter<void>();
  }

  ngOnInit() {}

  hideMenu() {
    this.clickMenu.emit();
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
