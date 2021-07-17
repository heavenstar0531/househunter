import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/common/types';
import * as c3 from 'c3'

@Component({
  selector: 'app-property-stats',
  templateUrl: './property-stats.component.html',
  styleUrls: ['./property-stats.component.sass']
})
export class PropertyStatsComponent implements OnInit, AfterViewInit {
  stats: Stats = new Stats();
  // graph 1
  graph1: null|c3.ChartAPI = null;
  price_range: any = {
      "<= 2500":   0,
      "<= 5000":   0,
      "<= 10000":  0,
      "<= 20000":  0,
      "<= 50000":  0,
      "<= 100000": 0,
      "<= 200000": 0,
      "> 200000":  0,
  };
  // graph 2
  cities: any = {};
  // graph 3
  houses: any = { "rent": 0, "sale": 0 };
  // graph 4
  flats: any = { "rent": 0, "sale": 0 };
  // graph 5
  profit: any = { "rent": 0, "sale": 0 };


  

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.graph1 = c3.generate({
    bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }
}
