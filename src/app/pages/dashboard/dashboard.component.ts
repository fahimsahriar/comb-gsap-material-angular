import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpService } from '../../services/http-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import gsap from 'gsap';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatTableModule, CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  joke: any = {};
  wsData: any = null;

  constructor(private httpService: HttpService) {
  }
  ngAfterViewInit(): void {
    // this.initAnimations();
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

  initAnimations() {
    const el = this.container.nativeElement;

    const tl = gsap.timeline({
      defaults: { duration: 5 }
    });

    tl.from(el.querySelector(".box1"), { x: -100, opacity: 0 })
      .from(el.querySelector(".box2"), { y: 100, opacity: 0 }, "-=0.3")
      .from(el.querySelector(".box3"), { x: 100, opacity: 0 }, "+=0.2")
      .to(el.querySelector(".box1"), { rotation: 360 })
      .to(el.querySelector(".box2"), { scale: 1.2 }, "<")
      .to(el.querySelector(".box3"), { backgroundColor: "#ff6b6b" }, "<0.1");

    tl.addLabel("spin")
      .to(el.querySelector(".box1"), { rotation: 180 })
      .add("colorChange", "+=0.5")
      .to(el.querySelector(".box2"), { backgroundColor: "#4ecdc4" }, "colorChange")
      .to(el.querySelector(".box3"), { backgroundColor: "#45b7d1" }, "colorChange");
  }
}
