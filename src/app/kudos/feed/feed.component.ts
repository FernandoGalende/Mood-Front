import { Component, HostBinding, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @HostBinding('class')
  feedClass = 'feed';
  kudos: any;
  routeSubscription: Subscription;

  constructor(private _api: ApiService) { }

  ngOnInit() {
    this._api.getKudos('9').subscribe(
      res => {
        this.kudos = res.data.Items;
      },
      err => {
        this.kudos = [
          {
            date: Date.now(),
            from: '',
            id: '',
            message: 'Something went wrong, please try again later',
            to: '',
            type: 'anonymous'
          }
        ];
      }
    );
  }
}
