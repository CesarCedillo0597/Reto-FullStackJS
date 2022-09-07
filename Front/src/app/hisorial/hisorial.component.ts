import { Component, OnInit, ViewChild } from '@angular/core';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { ApiConnectionService } from '../services/api-connection.service';
import { Chart, ChartConfiguration,ChartOptions, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-hisorial',
  templateUrl: './hisorial.component.html',
  styleUrls: ['./hisorial.component.css']
})
export class HisorialComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private apiConsulta: ApiConnectionService) {
    Chart.register(Annotation);
    this.chart?.update();
  }
  public lineChartDataDB: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        data: [],
        label: 'Temperatura',
        borderColor: 'black',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Humedad',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
  
    ],
  };
  lineChartOptionsDB: ChartOptions<'line'> = {
    responsive: false
  };
  
  lineChartLegendDB = true;

  ngOnInit(): void {
    this.apiConsulta.getDatos$().subscribe(data=>{
      console.log(data);
        for(let i of data){
          if(i.sensor == 'TEMP'){
            this.lineChartDataDB.labels?.push(i.date);
            this.lineChartDataDB.datasets[0].data.push(i.value);
            this.chart?.update();
          }else
            this.lineChartDataDB.datasets[1].data.push(i.value);
            this.chart?.update();
  
        }
      });
  }

}
