import { Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/common/types';

@Component({
  selector: 'app-property-stats',
  templateUrl: './property-stats.component.html',
  styleUrls: ['./property-stats.component.sass']
})
export class PropertyStatsComponent implements OnInit {
  stats: Stats = new Stats();
  show_graphs: boolean = false;

  // graph 1
  price_range: any = {
      "<= 2500":   10,
      "<= 5000":   10,
      "<= 10000":  10,
      "<= 20000":  10,
      "<= 50000":  10,
      "<= 100000": 10,
      "<= 200000": 10,
      "> 200000":  10,
  };
  // graph 2
  cities: any = {};
  // graph 3
  houses: any = { "rent": 0, "sale": 0 };
  // graph 4
  flats: any = { "rent": 0, "sale": 0 };
  // graph 5
  profit: any = { "rent": 0, "sale": 0 };

  // TODO
  options: any = {
    bar: {
      width: {
        ratio: 0.6,   // this makes bar width 50% of length between ticks
      },
    },
    // size: {
    //   height: 100,
    //   width: 100,
    // },
    legend: {
      inset: true   // hide the x-axis legend
    },
    axis: {
      x: {
        show: false,
      },
      // y: {
      //   show: false  // hide the y-axis line & ticks
      // }
    },

    tooltip: {
      show: false,
    },


  }
  

  constructor() { }

  ngOnInit(): void {
  }
}
