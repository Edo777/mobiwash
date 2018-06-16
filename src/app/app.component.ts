
import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, MenuComponent } from "../pages/barrel";
import { ApiService } from "../services/api.service";
import { TranslateService } from '../translate/translate.service';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private api: ApiService,
    private serv: TranslateService,
    private loadingCtrl: LoadingController, ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: this.serv.translateImportant("Խնդրում ենք սպասել․․․", 'Please wait...')
    });
    loading.present();
    if (localStorage.getItem("phone_number")) {
      this.rootPage = MenuComponent;
      loading.dismiss()
    } else {
      this.rootPage = HomePage;
      loading.dismiss()
    }
  }
}

