import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Thought } from '../interfaces/thought';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss']
})
export class AnonymousComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  hostClass = 'anonymous-suggestion';
  private subscription: Subscription;
  selectedThought: Thought;

  constructor(
    private _api: ApiService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this.subscription = this._route.params.subscribe(params => {
      const id = params['id'];
      this._api.getSuggestion(id).subscribe(
        res => (this.selectedThought = res.data),
        err => {
          if (err.status === 404) {
            this._toast.setMessage({
              text:
                'A message with that token does not exist, or is not anonymous!',
              level: 'DANGER',
              persistent: false
            });
          }
          this._router.navigate(['']);
        }
      );
    });
  }

  onDeleteThought() {
    this._toast.setMessage({
      text: 'You have successfully deleted your anonymous message!',
      level: 'SUCCESS',
      persistent: false
    });
    this._router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
