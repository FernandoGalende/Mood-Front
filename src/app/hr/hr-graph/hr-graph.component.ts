import {
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild
} from '@angular/core';
import { Chart } from 'chart.js';
import { Emotions } from '../../../assets/emotions-dictionary';
import { ApiService } from '../../services/api.service';
import { FiltersService } from 'src/app/filters/filters.service';
import { FiltersModel } from 'src/app/filters/filters.model';

@Component({
  selector: 'app-hr-graph',
  templateUrl: './hr-graph.component.html',
  styleUrls: ['./hr-graph.component.scss']
})
export class HrGraphComponent implements OnInit {
  @HostBinding('class')
  graphClass = 'hr-graph';

  @ViewChild('canvas')
  canvas: ElementRef;

  myEmotion: Emotions;
  graphData: any;
  chart: Chart;
  showChart: boolean;
  showError: boolean;

  constructor(
    private ApiS: ApiService,
    private filtersService: FiltersService
  ) {
    this.showChart = false;
    this.myEmotion = new Emotions();
    this.showError = false;
    this.filtersService.filtersUpdated.subscribe((filters: FiltersModel) => {
      this.ApiS.getMoods(
        filters.fromDate,
        filters.toDate,
        filters.users
      ).subscribe(
        data => {
          this.graphData = data;
          this.showChart = true;
        },
        err => {
          console.error(err);
        }
      );
    });
  }

  ngOnInit() {
    this.ApiS.getMoods().subscribe(
      data => {
        this.graphData = data;
        this.showChart = true;
        this.showError = false;
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
        this.showError = true;
      }
    );
  }

  get votes() {
    return this.graphData.emotionsVoted.reduce((a, b) => a + b, 0);
  }
}
