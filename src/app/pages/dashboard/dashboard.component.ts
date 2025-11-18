import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpService } from '../../services/http-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatTableModule, CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  joke: any = {};
  wsData: any = null;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.loadJoke();
    this.loadWsStream();
  }
  loadJoke() {
    this.httpService.getData().subscribe({
      next: (data: any) => {
        this.joke = data;
      },
      error: (err: any) => {
        console.error('Error fetching posts:', err);
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }

  loadWsStream() {
    this.httpService.connect("wss://ws.bitmex.com/realtime?subscribe=orderBookL2:XBTUSD")
      .subscribe({
        next: (msg) => { this.wsData = msg; },
        error: (err) => console.error(err),
        complete: () => console.log("Closed")
      });
  }
}
