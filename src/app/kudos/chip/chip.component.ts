import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @Input() user: any;
  @Output() remove: EventEmitter<any>;
  constructor() {
    this.remove = new EventEmitter<any>();
  }

  ngOnInit() {}

  removeChip() {
    this.remove.emit(this.user);
  }
}
