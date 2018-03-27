/* tslint:disable */
import { enableProdMode, NgModuleRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';

enableProdMode();

// export const ENV_FIREBASE_CONFIG: any = FIREBASE_CONFIG;

export const environment: Environment = {
  production: true,
  showDevModule: false,
  // stripeKey: 'pk_test_oUwyjKnd6Js1T0Sw9sIMqA5t',
  stripeKey: 'sk_test_CTUaiNrmtNIKtmJh1ZdK4Hcv',
  firebase: {
    "apiKey": "AIzaSyB1HokgLe3PXOkCXlwgJZXWRklUQriEKzs",
    "authDomain": "wav-studios.firebaseapp.com",
    "databaseURL": "https://wav-studios.firebaseio.com",
    "projectId": "wav-studios",
    "storageBucket": "wav-studios.appspot.com",
    "messagingSenderId": "153525572978"
  },

  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   * @return {any}
   */
  decorateModuleRef(modRef: NgModuleRef<any>) {
    disableDebugTools();
    return modRef;
  },
  ENV_PROVIDERS: []
};
