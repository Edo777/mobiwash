import {Component} from "@angular/core";
import {ModalController, NavController, App, NavParams} from 'ionic-angular';
import {OrdersList, OrdersHistory, MenuComponent} from "../barrel";
import {NewOrder} from "../interfaces/interfaces";
import {MobiWash, CB} from "../../services/barrel.service";
import {TranslateService} from "../../translate/translate.service";


@Component({
  selector: 'user-account',
  templateUrl: 'user-account.component.html'
})

export class UserAccount {
  orders: NewOrder[] = [];
  datas: string[] = [];
  pageName: string = "general";
  activeLng: any;
  logoPath: string;
  constructor(public modalCtrl: ModalController,
              private mobiWash: MobiWash,
              private nav: NavController,
              public appCtrl: App,
              private params: NavParams,
			  private translateService: TranslateService,
			  private cb: CB,
			  
			) {

  }

  ngOnInit() {
    //this.logoPath = this.translateService.getActiveLng().lng == 'arm' ? '../assets/imgs/arm.jpg' : '../assets/imgs/en.jpg';
  }

  ionViewWillEnter() {
    this.logoPath = this.translateService.getActiveLng().lng == 'arm' ? 'assets/imgs/arm.jpg' : 'assets/imgs/en.jpg';
  }

  ngDoCheck() {
    this.logoPath = this.translateService.getActiveLng().lng == 'arm' ? 'assets/imgs/arm.jpg' : 'assets/imgs/en.jpg';
  }

  createNewOrder() {
    this.nav.push(OrdersList);
  }

  oldOrders() {
	this.cb.callBacks["orders"]();
   // this.nav.push(OrdersHistory)
  }
}
