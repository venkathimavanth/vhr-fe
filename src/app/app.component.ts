import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../root-styling.css', './app.component.css']
})
export class AppComponent {

  isLoggedIn!: boolean;
  password!: string;

  constructor(private router: Router, private commonService: CommonService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = false;
  }

  validatePassword(event: KeyboardEvent) {
    setTimeout(() => {
      if (this.password === 'aaaa********') {
        this.isLoggedIn = true;
      } else if (event.key === 'Enter') {
        this.commonService.showToast("Invalid Password", "error")
      }
    }, 100);
  }

}
