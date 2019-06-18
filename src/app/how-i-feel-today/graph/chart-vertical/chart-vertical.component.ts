import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Emotions } from '../../../../assets/emotions-dictionary';
import { GraphData } from '../../../interfaces/graph-Data';

@Component({
  selector: 'app-chart-vertical',
  templateUrl: './chart-vertical.component.html',
  styleUrls: ['./chart-vertical.component.scss']
})
export class ChartVerticalComponent implements OnInit {
  @Input()
  graphData: GraphData;

  @ViewChild('canvas')
  canvas: ElementRef;

  myEmotion: Emotions;
  chartVertical: Chart;

  constructor() {
    this.myEmotion = new Emotions();
  }

  ngOnInit() {
    this.chartVertical = new Chart(
      (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d'),
      {
        type: 'horizontalBar',
        data: {
          labels: [' ', ' ', ' ', ' ', ' '],
          datasets: [
            {
              data: this.graphData.emotionsVoted,
              backgroundColor: this.myEmotion.getData('color')
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false
                },
                barPercentage: 0.7,
                categoryPercentage: 0.6
              }
            ],
            xAxes: [
              {
                display: false,
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      }
    );
  }
}
