import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input()
  previous: boolean;
  @Input()
  next: boolean;
  @Output()
  navigationNext: EventEmitter<void>;
  @Output()
  navigationPrevious: EventEmitter<void>;

  constructor() {
    this.navigationNext = new EventEmitter<void>();
    this.navigationPrevious = new EventEmitter<void>();
  }

  ngOnInit() {}

  onClickNext() {
    this.navigationNext.emit();
  }

  onClickPrevious() {
    this.navigationPrevious.emit();
  }
}
