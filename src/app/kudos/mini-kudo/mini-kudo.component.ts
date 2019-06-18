import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mini-kudo',
  templateUrl: './mini-kudo.component.html',
  styleUrls: ['./mini-kudo.component.scss']
})
export class MiniKudoComponent implements OnInit {
  @Input()
  kudo: any;
  userInfo: any;

  constructor(private _user: UserService) { }

  ngOnInit() {
    this._user
      .getUser(this.kudo.to)
      .subscribe(res => (this.userInfo = res), err => console.error(err));
  }
}
