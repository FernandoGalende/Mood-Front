import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-kudo',
  templateUrl: './kudo.component.html',
  styleUrls: ['./kudo.component.scss']
})
export class KudoComponent implements OnInit {
  private _kudo: any;
  @Input()
  get kudo() {
    return this._kudo;
  }
  set kudo(value: any) {
    this._kudo = value;
    this.getUsersInfo();
  }
  userFromInfo: User;
  userToInfo: User;

  constructor(private _user: UserService) { }

  ngOnInit() {
    this.getUsersInfo();
  }

  getUsersInfo() {
    this._user
      .getUser(this._kudo.from)
      .subscribe(res => (this.userFromInfo = res), err => console.error(err));
    this._user
      .getUser(this._kudo.to)
      .subscribe(res => (this.userToInfo = res), err => console.error(err));
  }
}
