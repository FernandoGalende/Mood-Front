import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Thought } from '../../interfaces/thought';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mini-thought',
  templateUrl: './mini-thought.component.html',
  styleUrls: ['./mini-thought.component.scss']
})
export class MiniThoughtComponent implements OnInit {
  userInfo: User;
  @Input()
  thought: Thought;

  @Output()
  thoughtSelected = new EventEmitter<Thought>();

  constructor(private _user: UserService) {
    this.thoughtSelected = new EventEmitter<Thought>();
  }

  ngOnInit() {
    this._user
      .getUser(<string>this.thought.user)
      .subscribe(res => (this.userInfo = res));
  }

  onThoughtSelected() {
    this.thoughtSelected.emit(this.thought);
  }
}
