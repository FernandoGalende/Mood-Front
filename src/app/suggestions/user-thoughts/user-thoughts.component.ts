import { Component, HostBinding, OnInit } from '@angular/core';
import { Thought } from '../../interfaces/thought';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

const LIMIT = '6';

@Component({
  selector: 'app-user-thoughts',
  templateUrl: './user-thoughts.component.html',
  styleUrls: ['./user-thoughts.component.scss']
})
export class UserThoughtsComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'thougths-feed';

  thoughts: Thought[];
  selectedThought: Thought;
  selectedIndex: number;
  searching: boolean;

  navigation: string[];
  blockNext: boolean;
  blockPrevious: boolean;

  email: string;
  showError: boolean;

  constructor(private _api: ApiService, private _auth: AuthService) {
    this.searching = false;
    this.navigation = ['0'];
    this.blockPrevious = true;
    this.email = this._auth.getUserInfo().sub.split('|')[2];
    this.showError = false;
  }

  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions() {
    this._api
      .getSuggestionsFromUser(LIMIT, Date.now().toString(), this.email)
      .subscribe(
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
                user: this._auth.getUserInfo().sub.split('|')[2]
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
    this.getSuggestions();
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

  sendModifiedSuggestion(thought: Thought) {
    this._api.sendModifiedSuggestion(thought).subscribe();
  }

  onNavigationNext() {
    const next = this.navigation.slice(-1)[0];
    this._api.getSuggestionsFromUser(LIMIT, next, this.email).subscribe(
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
    const previous = this.navigation[this.navigation.length - 3];
    this._api.getSuggestionsFromUser(LIMIT, previous, this.email).subscribe(
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
