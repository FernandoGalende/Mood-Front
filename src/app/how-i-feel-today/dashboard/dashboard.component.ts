import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'dashboard';
  selectedMood: string;

  constructor(private _router: Router, private _toast: ToastService) {
    this.selectedMood = '';
    _router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {}

  onSelectMood(event) {
    this.selectedMood = event;
  }

  onFormSubmission(event) {
    this.selectedMood = '';
    this._toast.setMessage(event);
    this._router.navigate(['/']);
  }
}
