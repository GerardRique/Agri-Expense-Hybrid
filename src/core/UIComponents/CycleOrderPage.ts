import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
    template: `
      <ion-list radio-group [(ngModel)]="order">
        <ion-list-header>Order By:</ion-list-header>
        <ion-item>
          <ion-label>Date Created</ion-label>
          <ion-radio value="date" (click)="close()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Alphabetical</ion-label>
          <ion-radio value="alphabetical" (click)="close()"></ion-radio>
        </ion-item>
      </ion-list>
    `
  })

export class CycleOrderPage{

    order: string;

    constructor(public viewCtrl: ViewController, public navParams: NavParams){
      this.order = navParams.get('param1');
    }

    close(){
        this.viewCtrl.dismiss(this.order);
    }
}