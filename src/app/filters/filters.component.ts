import {
  Component,
  HostBinding,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FiltersModel } from './filters.model';
import { FiltersService } from './filters.service';
import { UserSuggestions } from '../user-suggestions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  hostClass = 'filters';

  @Input()
  showDateFilter: boolean;
  @Input()
  showUsersFilter: boolean;

  filters: FiltersModel;
  dateError: boolean;
  isCollapsed: boolean;
  // users: UserSuggestions[] = new UserSuggestions[]

  constructor(private filtersService: FiltersService) {
    this.filters = new FiltersModel(0, 0, []);
    this.dateError = false;
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.filtersService.clearfilters();
  }

  onUsersFilterChange(users: UserSuggestions[]) {
    this.filters.users = users;
    this.updatefilters();
  }

  onDateFilterChange(date: { fromDate: number; toDate: number }) {
    this.filters.fromDate = date.fromDate;
    this.filters.toDate = date.toDate;
    this.updatefilters();
  }

  validateDates() {
    if (this.filters.fromDate && this.filters.toDate) {
      return this.filters.fromDate <= this.filters.toDate;
    } else {
      return true;
    }
  }

  updatefilters() {
    if (this.validateDates()) {
      this.dateError = false;
      this.filtersService.updateFilters(this.filters);
    } else {
      this.dateError = true;
    }
  }
}
