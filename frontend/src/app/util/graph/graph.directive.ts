import { Directive, Input, ElementRef, Inject } from '@angular/core';
import * as c3 from 'c3'

@Directive({
  selector: '[graph]'
})
export class GraphDirective {
  chart: any|c3.ChartAPI;
  
  constructor(
    @Inject( ElementRef ) private graph_ref: ElementRef,
  ) {}

  @Input( 'graph' )
  type: string = "bar";
  @Input( 'data' )
  data: any = {};
  @Input( 'options' )
  options: any = {};

  ngAfterViewInit() {
    this.chart = c3.generate({
      bindto: this.graph_ref.nativeElement,
      data: {
        json: this.data,
        type: this.type,
      },
      ...( this.options ?? {} ),
    });

  }
}
