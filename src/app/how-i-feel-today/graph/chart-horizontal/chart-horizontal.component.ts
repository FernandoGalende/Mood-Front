import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Emotions } from '../../../../assets/emotions-dictionary';
import { GraphData } from '../../../interfaces/graph-Data';

@Component({
  selector: 'app-chart-horizontal',
  templateUrl: './chart-horizontal.component.html',
  styleUrls: ['./chart-horizontal.component.scss']
})
export class ChartHorizontalComponent implements OnInit, OnChanges {
  @Input()
  graphData: GraphData;

  @ViewChild('canvas')
  canvas: ElementRef;

  myEmotion: Emotions;
  chart: Chart;

  constructor() {
    this.myEmotion = new Emotions();
  }

  ngOnInit() {
    this.chart = new Chart(
      (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d'),
      {
        type: 'bar',
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
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                barPercentage: 0.3,
                categoryPercentage: 0.7
              }
            ],
            yAxes: [
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && changes.graphData) {
      this.chart.config.data.datasets[0].data = this.graphData.emotionsVoted;
      this.chart.update();
    }
  }
}
