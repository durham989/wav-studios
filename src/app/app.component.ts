/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'environments/environment';
import { AppState } from './app.service';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {
  public name = 'WAV Studios';
  public tipe = 'assets/img/WAV_Studios_Logo_smaller.png';
  public twitter = 'https://twitter.com/durham989';
  public url = 'https://kasuriagroup.com';
  public showDevModule: boolean = environment.showDevModule;

  @ViewChild('homeVideo') videoplayer: any;

  constructor(
    public appState: AppState,
    private router: Router,
    private db: AngularFirestore
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);

    this.videoplayer.nativeElement.autoplay = true;
    this.videoplayer.nativeElement.muted = true;
    
    // auto-scroll to the top of each page
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0,0);
    });
  }

}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
