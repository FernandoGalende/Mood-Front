import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent {
  toDate: number;
  fromDate: number;
  @Output()
  dateChanged: EventEmitter<{ fromDate: number; toDate: number }>;

  constructor() {
    this.dateChanged = new EventEmitter<{
      fromDate: number;
      toDate: number;
    }>();
  }

  onDateChanged() {
    this.dateChanged.emit({ fromDate: this.fromDate, toDate: this.toDate });
  }
}
