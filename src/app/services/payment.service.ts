import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PaymentService {
  userId: string;

  stripe = Stripe('pk_test_oUwyjKnd6Js1T0Sw9sIMqA5t');

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    // this.afAuth.auth.signInAnonymouslyAndRetrieveData();
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    });
  }

  processPayment(token: any, amount: number, size: string, quantity: number, productTitle: string) {
    const payment = { token, amount, size, quantity, productTitle};
    this.userId = this.generateUUID();
    return this.db.list(`/payments/${this.userId}`).push(payment);
  }

  generateUUID(){
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function"){
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
}