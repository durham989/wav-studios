import { Component, OnInit } from '@angular/core';
import { XLargeDirective } from './x-large';
import { Router } from '@angular/router';

@Component({
  selector: 'skull-tee', 
  styleUrls: [ './skull.component.scss' ],
  templateUrl: './skull.component.html'
})
export class SkullComponent implements OnInit {
  public localState = { value: '' };
  public skullFront: Boolean;

  constructor(private router: Router) {}

  public ngOnInit() {
    console.log('hello `Skull` component');
    this.skullFront = true;
  }

  public skullFrontToBack() {
    this.skullFront = !this.skullFront;
  }

  public navigateHome() {
    this.router.navigate(['/home']);
  }

  // TODO: Add popup to display enlarged versions of product images
  
  // TODO: Add in Stripe

  // TODO: Add in Product Details
}
