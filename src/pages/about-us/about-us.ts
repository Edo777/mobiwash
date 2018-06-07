import {Component} from '@angular/core';
import {NavParams} from "ionic-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'about-us-page',
  templateUrl: 'about-us.html'
})

export class AboutUs {
  pageName: string;

  constructor(private navParams: NavParams, private iab: InAppBrowser) {
    this.pageName = this.navParams.get('pageName');
  }
  openUrl(url) {
	const browser = this.iab.create(url);
	} 
}
