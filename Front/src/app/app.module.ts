import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card'; 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HisorialComponent } from './hisorial/hisorial.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HisorialComponent
  ],

  imports: [
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
