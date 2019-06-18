import { Component, HostBinding, OnInit } from '@angular/core';
import { GeneralMood } from '../../interfaces/general-mood';
import { ApiService } from '../../services/api.service';
import { FiltersService } from 'src/app/filters/filters.service';
import { FiltersModel } from 'src/app/filters/filters.model';

const LIMIT = '6';

@Component({
  selector: 'app-mood-messages',
  templateUrl: './mood-messages.component.html',
  styleUrls: ['./mood-messages.component.scss']
})
export class MoodMessagesComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'mood-messages';
  moods: GeneralMood[];

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
      this._api
        .getHrMoods(
          LIMIT,
          filters.fromDate.toString(),
          filters.toDate.toString(),
          filters.users
        )
        .subscribe(
          res => {
            this.navigation = ['0'];
            this.showError = false;
            this.moods = res.data.Items;
            // this.filtersService.hrGraphData(this.moods);
            if (this.moods.length !== 0) {
              this.showPlaceholder = false;
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
    this._api.getHrMoods(LIMIT).subscribe(
      res => {
        this.showError = false;
        this.moods = res.data.Items;
        if (this.moods.length !== 0) {
          this.showPlaceholder = false;
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
    const next = this.navigation.slice(-1)[0];
    const filters = this.filtersService.getFilters();
    this._api
      .getHrMoods(LIMIT, filters.fromDate.toString(), next, filters.users)
      .subscribe(
        res => {
          this.moods = res.data.Items;
          this.navigation.push(this.getLastDate());
          this.blockButtons(res);
        },
        err => console.error(err)
      );
  }

  onNavigationPrevious() {
    const filters = this.filtersService.getFilters();
    const previous = this.navigation[this.navigation.length - 3];
    this._api
      .getHrMoods(LIMIT, filters.fromDate.toString(), previous, filters.users)
      .subscribe(
        res => {
          this.moods = res.data.Items;
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
    return this.moods.slice(-1)[0].date;
  }
}
