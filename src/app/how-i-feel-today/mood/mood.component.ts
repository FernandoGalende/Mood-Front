import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent implements OnInit {
  @Input()
  name: string;

  names: Object = {
    awesome: 'Awesome!',
    'pretty-good': 'Pretty good',
    meh: 'Meh',
    'not-great': 'Not great',
    terrible: 'Terrible'
  };

  constructor() {}

  ngOnInit() {}
}
