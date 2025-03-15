import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../root-styling.css', './app.component.css']
})
export class AppComponent {

  isLoggedIn!: boolean;
  password!: string;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = true;
  }

  validatePassword(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.password === 'Password@123') {
      this.isLoggedIn = true;
    }
  }

}
