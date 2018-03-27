import { Component } from '@angular/core';
import { XLargeDirective } from './x-large';
import { Router } from '@angular/router';

@Component({
  selector: 'wav-studios-header', 
  styleUrls: [ './header.component.scss' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  public navigateHome() {
    this.router.navigate(['/home']);
  }
}
