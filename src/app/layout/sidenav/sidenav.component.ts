import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  targetTime!: number;
  remainingTime!: number;
  intervalId!: any;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.targetTime = new Date().getTime() + 50 * 60 * 1000; // 5 mins ahead
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    const currentTime = new Date().getTime();
    this.remainingTime = Math.max(0, this.targetTime - currentTime);
    if (this.remainingTime <= 0) {
      clearInterval(this.intervalId);
      window.location.reload();
    }
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60000);
    const seconds = Math.floor((this.remainingTime % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
