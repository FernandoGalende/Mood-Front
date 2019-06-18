import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../interfaces/message';

const LEVELS = {
  SUCCESS: '#00ad3b',
  DANGER: '#f50038',
  WARN: '#f57401'
};

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  timeOut: any;
  _message: Message;
  @Input()
  get message(): Message {
    return this._message;
  }
  set message(value: Message) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this._message = value;
    if (!this.message.persistent) {
      this.timeOut = setTimeout(() => {
        this.onRemove();
      }, 2000);
    }
  }

  @Output()
  remove: EventEmitter<void>;

  get levels() {
    return LEVELS;
  }

  constructor() {
    this.remove = new EventEmitter<void>();
  }

  onRemove() {
    this.remove.emit();
  }
}
