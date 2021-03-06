import { Component, OnInit, HostListener } from '@angular/core';
import { XLargeDirective } from './x-large';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementOptions } from 'ngx-stripe';

import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../environments/environment.prod';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'crewneck-sweater', 
  styleUrls: [ './crew.component.scss' ],
  templateUrl: './crew.component.html'
})

export class CrewComponent implements OnInit {
  public amount: number; // Total amount
  public label: string; // Label for product
  
  public localState = { value: '' };
  public crewFront: Boolean;
  
  // Stripe Variables
  public elements: Elements;
  public card: StripeElement;
  // public elements: any;
  public paymentRequest: any;
  public prButton: any;
  public handler: any;
  public paymentSuccess: Boolean;

  // Order Form
  public orderForm = new FormGroup({
    size: new FormControl('M', Validators.required),
    quantity: new FormControl(1, Validators.required),
    productTitle: new FormControl('WAV Studios Classic Crewneck Sweater', Validators.required)
  });


  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
    this.paymentSuccess = true;
    this.router.navigate(['/home']);
  }

  constructor (private router: Router, 
    private stripeService: StripeService,
    private paymentService: PaymentService,
    public afAuth: AngularFireAuth) {}

  public ngOnInit() {
    console.log('hello `Crew` component');
    this.crewFront = true;
    this.paymentSuccess = false;
    this.amount = 9500;
    this.label = 'WAV Studios Classic Crewneck Sweater';
    this.afAuth.auth.signInAnonymously();
    // this.initializeStripeElement();
    // this.initializeStripeHandler();
  }

  public crewFrontToBack() {
    this.crewFront = !this.crewFront;
  }

  public navigateHome() {
    this.router.navigate(['/home']);
  }
  
  initializeStripeElement() {
    this.stripeService.elements().subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  initializeStripeHandler() {
    var orderQuantity = this.orderForm.get('quantity').value;
    var orderSize = this.orderForm.get('size').value;
    var orderProduct = this.orderForm.get('productTitle').value;
    console.log('crewneck size is: ' + orderSize);
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        this.paymentService.processPayment(token, (this.amount * orderQuantity), orderSize, orderQuantity, orderProduct);
        this.paymentSuccess = true;
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'WAV Studios Classic Crewneck Sweater',
      amount: (this.amount * this.orderForm.get('quantity').value),
      shippingAddress: true,
      billingAddress: true
    });
  }

  purchaseCrewSweater() {
    this.initializeStripeHandler();
    this.handlePayment();
  }
}
