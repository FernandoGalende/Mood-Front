import { Component, Input, OnInit } from '@angular/core';
import { GeneralMood } from '../../interfaces/general-mood';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mood-message',
  templateUrl: './mood-message.component.html',
  styleUrls: ['./mood-message.component.scss']
})
export class MoodMessageComponent implements OnInit {
  userInfo: any;
  @Input()
  mood: GeneralMood;

  constructor(private _user: UserService) {}

  ngOnInit() {
    this._user.getUser(this.mood.user).subscribe(res => {
      this.userInfo = res;
    });
  }
}
