import {Component, ViewChild, OnInit, NgZone, ViewChildren} from '@angular/core';
import {NewOrder} from '../interfaces/interfaces';
import {CarsService} from "../../services/cars.service";
import {
  ViewController,
  Platform,
  Content,
  NavController,
  AlertController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";
import {Keyboard} from "@ionic-native/keyboard";
import {MobiWash} from "../../services/barrel.service";
import {TranslateService} from "../../translate/translate.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'orders-register',
  templateUrl: 'orders-register.html',
  providers: [Keyboard]
})

export class OrdersRegister implements OnInit {
  //edit order
  private orderEdit: any;

  private modelName;
  brandName;
  carNumber;
  service;
  qim;
  nano;
  private prices;
  private todo: FormGroup;

  historyCars: any;
  cars = [];
  brands: string[];
  models: string[] = [];
  localModels: string[] = [];
  //serach area closer
  isCompleteBrand: boolean = false;
  //serach area closer
  isCompleteModel: boolean = false;
  rows: any = {hide1: true, hide2: false, hide3: false, hide4: false, hide5: false};
  CAR: NewOrder = {make_id: '', model_id: '', car_number: '', service: "", type: ""};
  selectedPrice = [0, 0, 0]
  @ViewChild(Content) content: Content;
  @ViewChildren("radio") radio: any;

  constructor(private ordersCtrl: CarsService,
              private viewCtrl: ViewController,
              public keyboard: Keyboard,
              public platform: Platform,
              private mobiWash: MobiWash,
              private nav: NavController,
              private alertCtrl: AlertController,
              private params: NavParams,
              private ngZone: NgZone,
              private serv: TranslateService,
              private loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private keyBoard: Keyboard) {
    this.initializeCars();
    this.todo = this.formBuilder.group({
      make_id: ['', Validators.required],
      model_id: ['', Validators.required],
      car_number: ['', Validators.required],
    });
  }

  
  ngOnInit() {
    this.historyCars = this.mobiWash.getCars();
   // this.keyboardEnterButton();
    this.prices = [
      [1999, 2999, 3999],
      [1499, 1999, 2999],
      [999, 1499, 1999],
      [6999, 7999, 8999],
      [1499, 1499, 1499]
    ]
    this.isHasDataWhenModalOpen();
  }

  /////////////////////////

  checkBrandButton(brand, val) {
    this.brandName = brand.name;
    this.CAR.make_id = brand.id;
    this.models = brand.models;
  }

  checkModelButton(mod) {
    this.modelName = mod.name;
    this.CAR.model_id = mod.id;
  }

  //get cars from service
  initializeCars() {
    this.cars = this.ordersCtrl.getResults()
  }


  ionViewWillEnter() {
    this.cars = this.ordersCtrl.getResults()

  }

  getBrands(ev: any) {
    this.initializeCars();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.brands = this.cars.filter((item) => {
        return (item.name.toLowerCase().startsWith(val.toLowerCase()));
      })
    } else {
      this.brands = []
    }
  }

  getModels(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '' && this.models) {
      this.localModels = this.models.filter((item: any) => {
        return (item.name.toLowerCase().startsWith(val.toLowerCase()));
      })
    } else {
      this.localModels = []
    }
  }

  completeRegisterPage() {
    this.CAR = this.todo.value;

    this.carTypeControl();
    this.viewCtrl.dismiss(this.CAR);

  }

  ///////////////////////////

  closeRegisterPage() {
    this.viewCtrl.dismiss()
  }

  //////////////////////////////////
  //for constrol errors in time click ok

  completeBlur(id) {
    if (id === 1 && this.brandName != '') {
      this.isCompleteBrand = false;
      this.rows.hide2 = true;
    } else if (id === 2) {
      this.isCompleteModel = false;
      this.rows.hide3 = true;
    } else if (id === 3) {
      this.CAR["car_number"] = this.carNumber;
      this.rows.hide4 = true
    }
  }

  /////////////////////////////////////
  completeFocus(ev, id?) {
    if (id === 1) {
      this.isCompleteBrand = true;
    } else if (id === 2) {
      this.isCompleteModel = true;
    }
  }

  ///////////////////////////////

  private radioIndex;
  private isChecked;
  private arr = [];

  private selectedRadioIndex(index) {
    if (index == this.radioIndex) {
      this.isChecked = true;
      return;
    }

    this.arr[0] = `${index + 1}`;
    this.radioIndex = index;
  }

  radioDisable() {
    this.radio._results[this.radioIndex].checked = false;
    this.arr[0] = "";
    for (let i = 0; i < 3; i++) {
      this.selectedPrice[i] -= this.prices[this.radioIndex][i];
    }
    this.radioIndex = 5;
    this.isChecked = false;
  }

  calcPrice() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100)

    if (this.isChecked) {
      this.radioDisable()
      return
    }
    for (let i = 0; i < 3; i++) {
      if (this.arr[0] && this.nano) {
        this.selectedPrice[i] = this.prices[this.arr[0] - 1][i] + 0;
        this.selectedPrice[i] += (this.prices[4][i] - 499)
      } else if (this.arr[0]) {
        this.selectedPrice[i] = this.prices[this.arr[0] - 1][i] + 0;
      } else if (this.nano) {
        this.selectedPrice[i] = this.prices[4][i] + 0;
      }
    }
  }

  calcPriceOthers() {
    if (this.arr[0]) {

      for (let i = 0; i < 3; i++) {
        if (this.nano) {
          this.arr[1] = "4";
          this.selectedPrice[i] += (this.prices[4][i] - 499);
        } else if (this.nano != undefined) {
          this.arr[1] = "";
          this.selectedPrice[i] -= (this.prices[4][i] - 499);
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (this.nano) {
          this.arr[1] = "4";
          this.selectedPrice[i] += (this.prices[4][i]);
        } else if (this.nano != undefined) {
          this.arr[1] = "";
          this.selectedPrice[i] -= (this.prices[4][i]);
        }
      }
    }

  }

  private carTypeControl() {
    this.CAR["make_id"] = this.brandName;
    this.CAR["model_id"] = this.modelName;
    this.CAR["service"] = this.service;

    if (!this.arr[0] || !this.arr[1]) {
      this.CAR.service = this.arr[0] ? `${this.arr[0]}` : `${this.arr[1]}`;
    } else {
      this.CAR.service = this.arr.join(",")
    }

    this.CAR["type"] = "new";
    for (let brand of this.cars) {
      if (brand.name.toLowerCase() == this.brandName.toLowerCase()) {

        for (let model of brand.models) {
          if (model.name.toLowerCase() == this.modelName.toLowerCase()) {

            this.CAR["make_id"] = brand.id;
            this.CAR["model_id"] = model.id;
            delete this.CAR["type"];
            break;
          }
        }
        ;
        break;
      }
    }
    ;
  }

  isHasDataWhenModalOpen() {
    let orderEdit = this.params.data["orderEdit"];
    if (orderEdit) {
      this.orderEdit = orderEdit;
      this.rows.hide2 = true;
      this.rows.hide3 = true;
      this.rows.hide4 = true;
      this.carNumber = this.orderEdit.car_number;
      this.arr[0] = parseInt(this.orderEdit.service);
      if (this.arr[0] == "4") {
        this.nano = true;
        this.calcPriceOthers()
        this.arr[0] = "";
        this.arr[1] = "4";
        this.radioIndex = 5;
      }
      else if (this.orderEdit.service.length == 3) {
        this.nano = true;
        this.arr[1] = "4";
        this.radioIndex = this.arr[0] - 1;
      }
      if (orderEdit.type == "new") {

        let brand = this.cars.find((element) => orderEdit.make_id.toLowerCase() == element.name.toLowerCase());
        if (brand) {
          this.models = brand.models;
        }
        this.brandName = this.orderEdit.make_id;
        this.modelName = this.orderEdit.model_id;
      } else {

        let brand = this.cars.find((element) => orderEdit.make_id == element.id);
        let model = brand.models.find((element) => orderEdit.model_id == element.id);
        this.brandName = brand.name;
        this.modelName = model.name;

        this.models = brand.models;

      }
    }
  }

  /////////////////////////////
  //alert
  ////////////////////////////

  presentPrompt() {
    let inp = this.historyCars;
    let alert = this.alertCtrl.create();
    for (let i = 0; i < inp.length; i++) {
      if (inp[i].type == "new") {
        alert.addInput({
          type: 'radio',
          value: inp[i],
          label: inp[i].make_id + ' ' + inp[i].model_id + ' ' + inp[i].car_number,
        })
      } else {
        let brand = this.cars.find((element) => inp[i].make_id == element.id);
        if (!brand) {
          return
        }
        let model = brand.models.find((element) => inp[i].model_id == element.id)

        alert.addInput({
          type: 'radio',
          value: inp[i],
          label: brand.name + ' ' + model.name + ' ' + inp[i].car_number,
        })
      }
    }
    alert.addButton({
      text: this.serv.translateImportant("լավ", "ok"),
      handler: (data) => {
        //////////////////////////
        if (data) {
          let brand = this.cars.find((element) => element.id == data.make_id);
          if (brand) {
            this.models = brand.models;
          }
          this.carNumber = data.car_number;
          this.rows.hide2 = true;
          this.rows.hide3 = true;
          this.rows.hide4 = true;
          if (data.type == "new") {
            this.brandName = data.make_id;
            this.modelName = data.model_id;
          } else {
            let brand = this.cars.find((element) => element.id == data.make_id);
            let model = brand.models.find((element) => element.id == data.model_id);
            this.models = brand.models;
            this.brandName = brand.name;
            this.modelName = model.name;
          }
        }
      }
    })
    alert.present();
  }
}

