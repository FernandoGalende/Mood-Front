import { Component, EventEmitter, OnInit, Input, Output, ElementRef } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-notifications-dropdown',
  templateUrl: './notifications-dropdown.component.html',
  styleUrls: ['./notifications-dropdown.component.scss']
})
export class NotificationsDropdownComponent implements OnInit {
  @Input() notifications: any;
  scrollbar: any;

  @Output()
  updateDropdown: EventEmitter<number>;

  constructor(private _ref: ElementRef, private _api: ApiService, private _user: UserService) {
    this.updateDropdown = new EventEmitter<number>();
  }

  ngOnInit() {
    this.notifications.forEach(notification => {
      this._user.getUser(notification.from).subscribe(res => {
        notification.from = `${res.name} ${res.lastName}`;
      });
    });
    this.scrollbar = new PerfectScrollbar(
      this._ref.nativeElement.querySelector('.container'),
      {
        suppressScrollX: true,
        wheelSpeed: 0.2,
        wheelPropagation: true
      }
    );
  }

  updateUnreadList(selectedNotification) {
    this.updateDropdown.emit(selectedNotification);
  }

}
