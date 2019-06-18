import {
  Component,
  OnInit,
  HostBinding,
  EventEmitter,
  Output
} from '@angular/core';
import { UserSuggestions } from '../../user-suggestions';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'users-filter';

  // users: UserSuggestions[] = []
  @Output()
  usersChange: EventEmitter<UserSuggestions[]>;

  constructor() {
    this.usersChange = new EventEmitter<UserSuggestions[]>();
  }

  ngOnInit() {}

  onUsersAdded(usersFilter: UserSuggestions[]): void {
    this.usersChange.emit(usersFilter);
  }
}
