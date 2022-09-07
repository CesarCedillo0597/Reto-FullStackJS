import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration,ChartOptions, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';
import { SocketConectionService } from './services/socket-conection.service';
import { ApiConnectionService } from './services/api-connection.service';
import {MatGridListModule} from '@angular/material/grid-list'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PruebaFront';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
 

constructor(private socketConection: SocketConectionService, private apiConsulta: ApiConnectionService) {
  Chart.register(Annotation);
  this.chart?.update();
}

public lineChartData: ChartConfiguration<'line'>['data'] = {
  datasets: [
    {
      data: [],
      label: 'Temperatura',
      borderColor: 'black',
      pointBackgroundColor: 'black',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'black',
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
lineChartOptions: ChartOptions<'line'> = {
  responsive: false
};

lineChartLegend = true;
lasttemp:number=0;
lasthum:number=0;



ngOnInit(){
  this.socketConection.getInfo$().subscribe(infoSocket => {
    var date = new Date();
      var ejex = date.toLocaleString();
      const [HUM,TEMP]=infoSocket.data;
      this.lasthum = HUM.value;
      this.lasttemp = TEMP.value;
      this.lineChartData.datasets[0].data.push(TEMP.value);
      this.lineChartData.datasets[1].data.push(HUM.value);
      this.lineChartData.labels?.push(ejex);
      this.chart?.update();
    
  })

}
}