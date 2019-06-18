import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message: Message;

  constructor() {
    this.message = {} as Message;
  }

  getMessage(): Message {
    const result = this.message;
    this.message = {} as Message;
    return result;
  }

  setMessage(value: Message): void {
    this.message = value;
  }

  hasPendingMessage() {
    return this.message !== ({} as Message);
  }
}
