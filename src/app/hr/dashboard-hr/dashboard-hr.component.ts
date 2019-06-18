import { Component, HostBinding, OnInit } from '@angular/core';
import { FiltersModel } from 'src/app/filters/filters.model';

@Component({
  selector: 'app-dashboard-hr',
  templateUrl: './dashboard-hr.component.html',
  styleUrls: ['./dashboard-hr.component.scss']
})
export class DashboardHrComponent implements OnInit {
  @HostBinding('class')
  hostClass = 'hr-dashboard';

  dataFilters: FiltersModel;

  constructor() {}

  ngOnInit() {}
}
