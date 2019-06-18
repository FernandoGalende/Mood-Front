import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Emotions } from '../../../assets/emotions-dictionary';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @HostBinding('class')
  graphClass = 'graph';

  @ViewChild('canvas')
  canvas: ElementRef;

  myEmotion: Emotions;
  graphData: any;
  showChart: boolean;
  windowWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  constructor(
    private ApiS: ApiService,
    private _toast: ToastService,
    private _router: Router
  ) {
    this.showChart = false;
    this.myEmotion = new Emotions();
  }


  ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.ApiS.getMoods().subscribe(
      data => {
        this.graphData = data;
        this.showChart = true;
      },
      err => {
        this.graphData = {
          people: 0,
          emotionsVoted: [0, 0, 0, 0, 0],
          percentages: [
            { name: 'awesome', percent: '0' },
            { name: 'pretty-good', percent: '0' },
            { name: 'meh', percent: '0' },
            { name: 'not-great', percent: '0' },
            { name: 'terrible', percent: '0' }
          ]
        };
        this.showChart = true;
      }
    );
  }

}
