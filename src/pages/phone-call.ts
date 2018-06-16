import {Component} from "@angular/core";
import {CallNumber} from '@ionic-native/call-number';

@Component({
  selector: 'phone-call',
  template:
      `
    <button ion-button  (tap)="call()"> 
        <span>{{"connect_admin" | translate}}</span>
        <ion-icon name="call" item-end color="primary" margin-left></ion-icon>
    </button>
  `,
  providers: [CallNumber]
})
export class PhoneCall {
  constructor(private callNumber: CallNumber) {

  }

  call() {
    this.callNumber.callNumber("+37455950509", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
