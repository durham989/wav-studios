import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { XLargeDirective } from './x-large';
import { Router } from '@angular/router';
// import { StripeService, Elements, Element as StripeElement, ElementOptions } from 'ngx-stripe';
import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'staff-tee', 
  styleUrls: [ './staff.component.scss' ],
  templateUrl: './staff.component.html'
})

export class StaffComponent implements OnInit {
  @Input() amount: number; // Total amount
  @Input() label: string; // Label for product
  
  public localState = { value: '' };
  public staffFront: Boolean;
  
  // Stripe Variables
  // public elements: Elements;
  // public card: StripeElement;
  public elements: any;
  public paymentRequest: any;
  public prButton: any;
  public handler: any;

  @ViewChild('payElement') payElement;

  constructor (private router: Router, 
    // private stripeService: StripeService,
    private paymentService: PaymentService) {}

  public ngOnInit() {
    console.log('hello `Staff` component');
    this.staffFront = true;
    // this.initializeStripeElement();
    // this.initializeStripeHandler();
    this.instantiateStripeElement();
  }

  public staffFrontToBack() {
    this.staffFront = !this.staffFront;
  }

  public navigateHome() {
    this.router.navigate(['/home']);
  }

  // TODO: Add popup to display enlarged versions of product images
  
  // TODO: Add in Stripe
  // initializeStripeElement() {
  //   this.stripeService.elements().subscribe(elements => {
  //     this.elements = elements;
  //     // Only mount the element the first time
  //     if (!this.card) {
  //       this.card = this.elements.create('card', {
  //         style: {
  //           base: {
  //             iconColor: '#666EE8',
  //             color: '#31325F',
  //             lineHeight: '40px',
  //             fontWeight: 300,
  //             fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //             fontSize: '18px',
  //             '::placeholder': {
  //               color: '#CFD7E0'
  //             }
  //           }
  //         }
  //       });
  //       this.card.mount('#card-element');
  //     }
  //   });
  // }

  instantiateStripeElement() {
    // 1. instantiate the paymentRequest object
    this.paymentRequest = this.paymentService.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        amount: this.amount,
        label: this.label
      },
    });

    // 2. Initialize elements
    this.elements = this.paymentService.stripe.elements();

    // 3. Register listener
    this.paymentRequest.on('source', async (event) => {
      console.log(event);
      setTimeout(() => {
        event.complete('success')
      }, 1000)
    });

    // 4. Create the button
    this.prButton = this.elements.create('paymentRequestButton', {
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'buy',
          theme: 'dark'
        },
      }
    });

    // 5. Mount the button asynchronously
    this.mountButton();
  }

  async mountButton() {
    const result = await this.paymentRequest.canMakePayment();

    if (result) {
      this.prButton.mount(this.payElement.nativeElement);
    } else {
      console.error('Oops! Your browser is very old.');
    }
  }

  initializeStripeHandler() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://firebasestorage.googleapis.com/v0/b/wav-studios.appspot.com/o/WAV_Studios%400.5x.png?alt=media&token=29a546f4-ba0e-4a20-819f-bb5719d6bb75',
      locale: 'auto',
      token: token => {
        this.paymentService.processPayment(token, this.amount);
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'WAV Studios Staff Tee',
      excerpt: 'Purchase',
      amount: this.amount
    });
  }

  purchaseStaffTee() {
    // const name = this.stripeForm.get('name').value;
    // this.stripeService.createToken(this.card, { name }).subscribe(
    //   token => {
    //     console.log('token created: ' + token);
    //   },
    //   error => {
    //     console.log('error: ' + error);
    //   }
    // );
    this.handlePayment();
  }

  // TODO: Add in Product Details
}
