import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PaymentService {
  userId: string;

  stripe = Stripe('pk_test_oUwyjKnd6Js1T0Sw9sIMqA5t');

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    });
  }

  processPayment(token: any, amount: number) {
    const payment = { token, amount };
    return this.db.list(`/payments/${this.userId}`).push(payment);
  }
}