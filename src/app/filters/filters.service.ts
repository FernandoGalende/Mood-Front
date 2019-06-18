import { Injectable, EventEmitter } from '@angular/core';
import { FiltersModel } from './filters.model';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  filters: FiltersModel;
  filtersUpdated: EventEmitter<FiltersModel>;

  constructor() {
    this.filters = new FiltersModel(0, 0, []);
    this.filtersUpdated = new EventEmitter<FiltersModel>();
  }

  private parseDate(date): number {
    return !date ? 0 : Date.parse(date);
  }

  getFilters() {
    return this.filters;
  }

  updateFilters(newFilters: FiltersModel) {
    // this.filters = JSON.parse(JSON.stringify(newFilters));
    // this.filters = newFilters
    this.filters.fromDate = this.parseDate(newFilters.fromDate);
    this.filters.toDate = this.parseDate(newFilters.toDate);
    this.filters.users = newFilters.users;
    this.filtersUpdated.emit(this.filters);
  }

  clearfilters() {
    this.filters = new FiltersModel(0, 0, []);
    this.filtersUpdated.emit(this.filters);
  }
}
