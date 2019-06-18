import { Component, HostBinding, OnInit } from '@angular/core';
import { Thought } from '../../interfaces/thought';
import { ApiService } from '../../services/api.service';
import { FiltersService } from 'src/app/filters/filters.service';
import { FiltersModel } from 'src/app/filters/filters.model';

const LIMIT = '6';

@Component({
  selector: 'app-thoughts-feed',
  templateUrl: './thoughts-feed.component.html',
  styleUrls: ['./thoughts-feed.component.scss']
})
export class ThoughtsFeedComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'thougths-feed';
  thoughts: Thought[];
  selectedThought: Thought;
  selectedIndex: number;
  searching: boolean;

  navigation: string[];
  blockNext: boolean;
  blockPrevious: boolean;
  showError: boolean;

  constructor(
    private _api: ApiService,
    private filtersService: FiltersService
  ) {
    this.searching = false;
    this.navigation = ['0'];
    this.blockPrevious = true;
    this.showError = false;
    this.filtersService.filtersUpdated.subscribe((filters: FiltersModel) => {
      this._api
        .getSuggestions(LIMIT, Date.now().toString(), filters.users)
        .subscribe(
          (res: any) => {
            this.navigation = ['0'];
            this.showError = false;
            this.thoughts = res.data.Items;
            if (res.data.Items.length !== 0) {
              this.navigation.push(this.getLastDate());
              this.markAsRead(this.thoughts[0]);
              this.blockButtons(res);
            } else {
              this.thoughts = [
                {
                  answered: false,
                  date: Date.now().toString(),
                  dateLastModified: Date.now().toString(),
                  id: '',
                  isAnonymous: false,
                  message: 'There are no suggestions yet!',
                  read: true,
                  type: 'suggestion',
                  user: 'anonymous'
                }
              ];
              this.blockNext = true;
              this.blockPrevious = true;
              this.selectedThought = this.thoughts[0];
            }
          },
          err => {
            this.showError = true;
            this.thoughts = [
              {
                answered: false,
                date: Date.now().toString(),
                dateLastModified: Date.now().toString(),
                id: '',
                isAnonymous: false,
                message: 'Something went wrong, please try again later',
                read: true,
                type: 'suggestion',
                user: 'anonymous'
              }
            ];
            this.blockNext = true;
            this.blockPrevious = true;
          }
        );
    });
  }

  ngOnInit() {
    this._api.getSuggestions(LIMIT).subscribe(
      (res: any) => {
        this.showError = false;
        this.thoughts = res.data.Items;
        if (res.data.Items.length !== 0) {
          this.navigation.push(this.getLastDate());
          this.markAsRead(this.thoughts[0]);
          this.blockButtons(res);
        } else {
          this.thoughts = [
            {
              answered: false,
              date: Date.now().toString(),
              dateLastModified: Date.now().toString(),
              id: '',
              isAnonymous: false,
              message: 'There are no suggestions yet!',
              read: true,
              type: 'suggestion',
              user: 'anonymous'
            }
          ];
          this.blockNext = true;
          this.blockPrevious = true;
          this.selectedThought = this.thoughts[0];
        }
      },
      err => {
        this.showError = true;
        this.thoughts = [
          {
            answered: false,
            date: Date.now().toString(),
            dateLastModified: Date.now().toString(),
            id: '',
            isAnonymous: false,
            message: 'Something went wrong, please try again later',
            read: true,
            type: 'suggestion',
            user: 'anonymous'
          }
        ];
        this.blockNext = true;
        this.blockPrevious = true;
      }
    );
    if (!this.selectedThought) {
      this.selectedIndex = 0;
    }
  }

  onDeleteThought() {
    this._api.getSuggestions(LIMIT).subscribe(
      (res: any) => {
        this.thoughts = res.data.Items;
        this.navigation.push(this.getLastDate());
        this.markAsRead(this.thoughts[0]);
        this.blockButtons(res);
      },
      err => console.error(err)
    );
    if (!this.selectedThought) {
      this.selectedIndex = 0;
    }
  }

  markAsRead(thought: Thought): void {
    thought.read = true;
    this.selectedThought = thought;
    this.sendModifiedSuggestion(thought);
  }

  onThoughtSelected(event: Thought, index: number) {
    this.selectedThought = event;
    this.selectedIndex = index;
    this.markAsRead(event);
  }

  isSearching() {
    this.searching = !this.searching;
  }

  userSelected(data) {
    console.log(data);
    console.log(this.userSelected);
  }

  sendModifiedSuggestion(thought: Thought) {
    this._api.sendModifiedSuggestion(thought).subscribe();
  }

  onNavigationNext() {
    const filters = this.filtersService.getFilters();
    const next = this.navigation.slice(-1)[0];
    this._api.getSuggestions(LIMIT, next, filters.users).subscribe(
      res => {
        this.selectedIndex = 0;
        this.thoughts = res.data.Items;
        this.markAsRead(this.thoughts[0]);
        this.navigation.push(this.getLastDate());
        this.blockButtons(res);
      },
      err => console.error(err)
    );
  }

  onNavigationPrevious() {
    const filters = this.filtersService.getFilters();
    const previous = this.navigation[this.navigation.length - 3];
    this._api.getSuggestions(LIMIT, previous, filters.users).subscribe(
      res => {
        this.selectedIndex = 0;
        this.thoughts = res.data.Items;
        this.markAsRead(this.thoughts[0]);
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
    return this.thoughts.slice(-1)[0].date;
  }
}
