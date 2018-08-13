import { Component, ViewChild, ElementRef } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-first-block',
  templateUrl: './first-block.component.html',
  styleUrls: ['./first-block.component.scss']
})
export class FirstBlockComponent {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chart : any;

  titleOne = 'Produtos Mais Vendidos';
  contentOne = 'Grafico Representativo de Pizza contendo produtos mais vendidos';

  ngOnInit() {

    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.chart = new Chart(this.context, {
      type: 'pie',
      data: {
        labels: [
          "Saudi Arabia",
          "Russia",
          "Iraq",
          "United Arab Emirates",
          "Canada"
      ],
      datasets: [
          {
              data: [133.3, 259.2, 52.2, 51.2, 50.2],
              backgroundColor: [
                  "#FF6384",
                  "#63FF84",
                  "#ED7A00",
                  "#8463FF",
                  "#EDD600"
              ],
              borderColor: "#000000",
              borderWidth: 0.1
          }]
      },
      options: {
        rotation: -Math.PI,
        cutoutPercentage: 30,
        circumference: Math.PI,
        legend: {
          position: 'top'
        },
      }
  });
  }
  
}
