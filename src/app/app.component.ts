import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  showMessage: boolean;
  displayMenu: boolean;
  displayProfile: boolean;
  env_barname: string;
  isMood: boolean;
  message: Object;
  showBar: boolean;

  constructor(
    public auth: AuthService,
    private _router: Router,
    private _toast: ToastService
  ) {
    auth.isAuthenticated();
    this.showMessage = false;
    this.env_barname = environment.bar_name;
    this.displayProfile = false;
    this.displayMenu = false;
    this.message = {};
    this.showBar = false;
  }

  ngOnInit() {
    this.routeSubscription = this._router.events
      .pipe(filter((event: Event) => event instanceof ChildActivationEnd))
      .subscribe((event: ChildActivationEnd) => {
        if (this._toast.hasPendingMessage()) {
          this.message = this._toast.getMessage();
          this.showMessage = true;
        } else {
          this.showMessage = false;
        }
      });
    if (environment.bar_name !== 'PRODUCTION') {
      this.showBar = true;
    }
  }

  isInMoodPath(): boolean {
    return (
      /moods\?id=*/.test(this._router.url) || this._router.url === '/moods'
    );
  }

  hideSidebar() {
    return !this.auth.isAuthenticated();
  }

  onRemove() {
    this.showMessage = false;
  }

  onShowMenu(event: boolean): void {
    this.displayMenu = event;
  }

  onShowProfile(event: boolean): void {
    this.displayProfile = event;
  }

  onClickMenu() {
    this.displayMenu = false;
  }

  onProfileMenu() {
    this.displayProfile = true;
  }

  onLogoutProfile() {
    this.displayProfile = false;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
