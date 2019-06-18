import { Component, HostBinding, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FiltersService } from 'src/app/filters/filters.service';
import { FiltersModel } from 'src/app/filters/filters.model';

const LIMIT = '9';

@Component({
  selector: 'app-kudos-dashboard',
  templateUrl: './kudos-dashboard.component.html',
  styleUrls: ['./kudos-dashboard.component.scss']
})
export class KudosDashboardComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'kudos-dashboard';
  kudos: any;

  navigation: string[];
  blockNext: boolean;
  blockPrevious: boolean;
  showError: boolean;
  showPlaceholder: boolean;

  constructor(
    private _api: ApiService,
    private filtersService: FiltersService
  ) {
    this.navigation = ['0'];
    this.blockPrevious = true;
    this.showError = false;
    this.showPlaceholder = false;
    this.filtersService.filtersUpdated.subscribe((filters: FiltersModel) => {
      this._api.getKudos(LIMIT, Date.now().toString(), filters.users).subscribe(
        res => {
          this.navigation = ['0'];
          this.showPlaceholder = false;
          this.kudos = res.data.Items;
          if (this.kudos.length !== 0) {
            this.showError = false;
            this.navigation.push(this.getLastDate());
            this.blockButtons(res);
          } else {
            this.showPlaceholder = true;
          }
        },
        err => {
          this.showError = true;
        }
      );
    });
  }

  ngOnInit() {
    this._api.getKudos(LIMIT).subscribe(
      res => {
        this.showPlaceholder = false;
        this.kudos = res.data.Items;
        if (this.kudos.length !== 0) {
          this.showError = false;
          this.navigation.push(this.getLastDate());
          this.blockButtons(res);
        } else {
          this.showPlaceholder = true;
        }
      },
      err => {
        this.showError = true;
      }
    );
  }

  onNavigationNext() {
    const filters = this.filtersService.getFilters();
    const next = this.navigation.slice(-1)[0];
    this._api.getKudos(LIMIT, next, filters.users).subscribe(
      res => {
        this.kudos = res.data.Items;
        this.navigation.push(this.getLastDate());
        this.blockButtons(res);
      },
      err => console.error(err)
    );
  }

  onNavigationPrevious() {
    const filters = this.filtersService.getFilters();
    const previous = this.navigation[this.navigation.length - 3];
    this._api.getKudos(LIMIT, previous, filters.users).subscribe(
      res => {
        this.kudos = res.data.Items;
        this.navigation.pop();
        if (this.navigation.length === 1) {
          this.navigation.push(this.getLastDate());
        }
        this.blockButtons(res);
      },
      err => console.error(err)
    );
  }

  blockButtons(res) {
    this.blockNext = !res.hasAfter;
    this.blockPrevious = this.navigation.length === 2;
  }

  getLastDate(): string {
    return this.kudos.slice(-1)[0].date;
  }
}
