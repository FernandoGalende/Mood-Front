import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output()
  displayMenu: EventEmitter<boolean>;
  @Output()
  displayProfile: EventEmitter<boolean>;
  @Input()
  hideMenu: boolean;
  @Input()
  showProfile: boolean;

  dropdown: boolean;
  userInfo: any;
  windowWidth: number;
  showNotifications: boolean;
  notifications: any;
  notificationsNumber: number;
  missingNotifications: boolean;
  routeSubscription: Subscription;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.isScrollAndNotClick('.dropdown', '.dropdown-button', event)) {
      this.dropdown = false;
    }
    if (this.isNotificationsScrollAndNotClick('.notifications', event)) {
      this.showNotifications = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _ref: ElementRef,
    private _router: Router
  ) {
    this.dropdown = false;
    this.showNotifications = false;
    this.hideMenu = false;
    this.displayMenu = new EventEmitter<boolean>();
    this.displayProfile = new EventEmitter<boolean>();
    this.notificationsNumber = 0;
    this.missingNotifications = true;
  }

  ngOnInit() {
    this.subcribeNotifications();
    this.windowWidth = window.innerWidth;
    if (this._auth.isAuthenticated()) {
      this.userInfo = this._auth.getUserInfo();
      this.getUnreadNotifications();
      return true;
    } else {
      this.userInfo = {};
      return false;
    }
  }

  show() {
    if (this._auth.isAuthenticated()) {
      if (this.missingNotifications) {
        this.getUnreadNotifications();
        this.missingNotifications = false;
      }
      this.userInfo = this._auth.getUserInfo();
      return true;
    } else {
      this.userInfo = {};
      return false;
    }
  }

  getUnreadNotifications() {
    if (this._auth.isAuthenticated()) {
      this._api.getNotifications().subscribe(
        res => {
          this.notifications = res.data;
          if (this.notifications) {
            this.notificationsNumber = this.notifications.length;
          }
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  toggleDropdownUser() {
    this.dropdown = !this.dropdown;
    if (!this.dropdown) {
      this.getUnreadNotifications();
    }
  }

  toggleDropdownNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  handleCloseDropdown(selectedNotification) {
    this.toggleDropdownNotifications();
    this.notificationsNumber =
      this.notificationsNumber === 0
        ? this.notificationsNumber
        : this.notificationsNumber - 1;
    this._api.removeNotification(selectedNotification).subscribe(() => {
      this.getUnreadNotifications();
    });
  }

  onHideMenu() {
    this.dropdown = false;
    this.displayMenu.emit(false);
  }

  handleLogout() {
    this.displayProfile.emit(false);
    this.dropdown = false;
    this.hideMenu = false;
    this.routeSubscription.unsubscribe();
  }

  changeShowStatus() {
    this.displayProfile.emit(false);
    this.showProfile = false;
    this.hideMenu = !this.hideMenu;
    this.displayMenu.emit(this.hideMenu);
  }

  changeProfile() {
    this.displayMenu.emit(false);
    this.showProfile = !this.showProfile;
    this.displayProfile.emit(this.showProfile);
  }

  isScrollAndNotClick(tagElement, childTag, event) {
    return (
      this.dropdown &&
      this._ref.nativeElement.querySelector(childTag) &&
      !this._ref.nativeElement.querySelector(childTag).contains(event.target) &&
      !this._ref.nativeElement.querySelector(tagElement).contains(event.target)
    );
  }

  isNotificationsScrollAndNotClick(tagElement, event) {
    return (
      this.showNotifications &&
      this._ref.nativeElement.querySelector(tagElement) &&
      !this._ref.nativeElement.querySelector(tagElement).contains(event.target)
    );
  }

  subcribeNotifications() {
    this.routeSubscription = this._router.events
      .pipe(filter((event: Event) => event instanceof ChildActivationEnd))
      .subscribe(() => {
        this.getUnreadNotifications();
      });
  }
}
