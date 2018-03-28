/* tslint:disable */

import { ApplicationRef, NgModuleRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';

Error.stackTraceLimit = Infinity;
require('zone.js/dist/long-stack-trace-zone');

// export const ENV_FIREBASE_CONFIG: any = FIREBASE_CONFIG;

export const environment: Environment = {
  production: false,

  showDevModule: true,

  stripeKey: 'pk_test_oUwyjKnd6Js1T0Sw9sIMqA5t',
  firebase: {
    "apiKey": "AIzaSyB1HokgLe3PXOkCXlwgJZXWRklUQriEKzs",
    "authDomain": "wav-studios.firebaseapp.com",
    "databaseURL": "https://wav-studios.firebaseio.com",
    "projectId": "wav-studios",
    "storageBucket": "wav-studios.appspot.com",
    "messagingSenderId": "153525572978"
  },
  // stripeKey: 'sk_test_CTUaiNrmtNIKtmJh1ZdK4Hcv',

  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   * @return {any}
   */
  decorateModuleRef(modRef: NgModuleRef<any>) {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  },
  ENV_PROVIDERS: []
};

