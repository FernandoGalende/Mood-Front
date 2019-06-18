import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  Input,
  ViewChild
} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { normalize } from '../../../assets/string-normalize.js';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { UserSuggestions } from '../../user-suggestions';
import { authConfig } from 'src/environments/environment.prod.js';

@Component({
  selector: 'app-user-chips',
  templateUrl: './user-chips.component.html',
  styleUrls: ['./user-chips.component.scss']
})
export class UserChipsComponent implements OnInit, OnDestroy {
  @ViewChild('userInput')
  userInput: ElementRef;
  @Output()
  users: EventEmitter<UserSuggestions[]>;
  recommendedUsers: UserSuggestions[];
  currentUser: string;
  userChips: UserSuggestions[];
  scrollbar: any;
  @Input()
  showAllSuggestions: Boolean;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (
      this.recommendedUsers &&
      !this._ref.nativeElement.contains(event.target)
    ) {
      this.recommendedUsers = [];
    }
  }

  constructor(
    private _api: ApiService,
    private _ref: ElementRef,
    private _auth: AuthService
  ) {
    this.currentUser = '';
    this.userChips = [];
    this.recommendedUsers = [];
    this.users = new EventEmitter<UserSuggestions[]>();
  }

  ngOnInit() {
    this.scrollbar = new PerfectScrollbar(
      this._ref.nativeElement.querySelector('.container'),
      {
        suppressScrollX: true,
        wheelSpeed: 0.2,
        wheelPropagation: true
      }
    );
  }

  onKeyUp(event): void {
    if (this.userInput.nativeElement.value.length === 0) {
      this.recommendedUsers = [];
    }
    if (event.keyCode === 8 && this.userChips && !this.currentUser) {
      this.userChips.pop();
      this.users.emit(this.userChips);
      this.cleanInput();
      this.handleFocus();
    } else if (this.userInput.nativeElement.value.length > 1) {
      this.currentUser = normalize(event.target.value);
      this.getUserRecommendations(this.currentUser);
    } else if (event.keyCode === 8 && !this.currentUser) {
      this.recommendedUsers = [];
    }
  }

  getUserRecommendations(currentUser: string): void {
    this._api
      .getUsers(currentUser)
      .subscribe(
        (res: any) => (this.recommendedUsers = this.filterUsers(res.data))
      );
  }

  filterUsers(data: UserSuggestions[]) {
    const myEmail = this._auth.getUserInfo().sub.split('|')[2];
    if (this.showAllSuggestions) {
      // Si estoy en el componente de Office Mood devuelvo todas las sugerencias
      return data;
    } else {
      return data.filter(
        (user: UserSuggestions) =>
          !this.userChips.some(
            (chip: UserSuggestions) => user.email === chip.email
          ) && user.email !== myEmail
      );
    }
  }

  addChip(user: UserSuggestions): void {
    this.userChips = [...this.userChips, user];
    this.users.emit(this.userChips);
    this.cleanInput();
    this.handleFocus();
    this.scrollbar.update();
  }

  cleanInput(): void {
    this.userInput.nativeElement.value = '';
    this.currentUser = '';
    this.recommendedUsers = [];
  }

  handleFocus(): void {
    this.userInput.nativeElement.focus();
  }

  onRemove(user: UserSuggestions) {
    this.userChips = this.userChips.filter(
      (el: UserSuggestions) => el.email !== user.email
    );
    this.users.emit(this.userChips);
  }

  ngOnDestroy() {
    this.scrollbar.destroy();
    this.scrollbar = null;
  }
}
