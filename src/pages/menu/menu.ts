import {Component, ViewChild} from "@angular/core";
import {NavController, Nav, NavParams, AlertController} from 'ionic-angular';
import {
  UserAccount,
  HomePage,
  HistoryPage,
  AboutUs,
  Addresses,
  OrdersPage,
  OrdersHistory,
  Settings,
  ServicesAndPrices
} from '../barrel'
import {MobiWash, CB} from "../../services/barrel.service";
import {TranslateService} from "../../translate/translate.service";
import {CallNumber} from "@ionic-native/call-number";

interface Pages {
  pageName: string,
  component: any
}

@Component({
  selector: 'menu-page',
  templateUrl: 'menu.html',
  providers: [CallNumber]
})

export class MenuComponent {
  @ViewChild(Nav) nav: Nav;

  rootPage = UserAccount;
  activePage: any = UserAccount;
  activeLng: any;
  localActiveLng: string;
  activeLngText: string;
  activeFlag: string;
  id: number;

  pages: Pages[];

  constructor(public navCtrl: NavController,
              public params: NavParams,
              private mobiWash: MobiWash,
              private alertCtrl: AlertController,
              private serv: TranslateService,
			  private callNumber: CallNumber,
			  private cb:CB
			) {
	this.pages = [
    {pageName: "general", component: OrdersPage},
    {pageName: "services_and_prices", component: ServicesAndPrices},
    {pageName: "about_us", component: AboutUs},
		{pageName: "favorite_cars", component: HistoryPage},
		{pageName: "favorite_addresses", component: Addresses},
		{pageName: "my_orders", component: OrdersHistory},
		{pageName: "personal_inf", component: Settings}
	  ];
    this.activeLng = this.serv.getActiveLng();
	  this.cb.setCb(this.openOrders.bind(this), "orders")
  }

  ngOnInit() {

    this.localActiveLng = this.activeLng.lng;
    this.activeLngText = this.activeLng.text;
    this.activeFlag = this.activeLng.flag;

  }

  bgChange(page) {
    return page.component == this.activePage;

  }

  openPage(page: Pages) {
    this.activePage = page.component;
    this.nav.setRoot(page.component, {pageName: page.pageName});
  }

  //call admin
  callAdmin() {
    this.callNumber.callNumber("+37455950905", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  openOrders(){
	  	console.log(this.pages)
		this.activePage = this.pages[5].component;
    	this.nav.setRoot(this.pages[5].component, {pageName: this.pages[5].pageName});
  }
  //language
  changeLng() {
    this.activeLngText = this.serv.translateImportant("Հայերեն", "English");
    if (this.localActiveLng == "en") {
      this.localActiveLng = "arm"
      this.activeFlag = 'assets/imgs/english.png'
    } else {
      this.localActiveLng = "en";
      this.activeFlag = 'assets/imgs/drosh.jpg';
    }
    let getter = {
      lng: this.localActiveLng,
      text: this.activeLngText,
      flag: this.activeFlag
    }
    this.serv.setActiveLng(getter);
  }

  outUser() {
    let a: any = {};
    a.exit = this.serv.translateImportant("Այո", "Yes");
    a.cancel = this.serv.translateImportant("Ոչ", "No");
    a.question = this.serv.translateImportant("Դուք վստա՞հ եք", "Are you sure?")
    let confirm = this.alertCtrl.create({
      enableBackdropDismiss: false,
      message: a.question,
      buttons: [
        {
          text: a.cancel,
          handler: () => {
          }
        },
        {
          text: a.exit,
          handler: () => {
            this.navCtrl.setRoot(HomePage);
            localStorage.removeItem("phone_number")
            localStorage.removeItem("id")
          }
        }

      ]
    });
    confirm.present();
  }
}
