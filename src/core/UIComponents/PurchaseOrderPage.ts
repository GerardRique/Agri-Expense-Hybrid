import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
    template: `
      <ion-list radio-group [(ngModel)]="filter">
        <ion-list-header>Filter By:</ion-list-header>
        <ion-item>
          <ion-label>Plant Material</ion-label>
          <ion-radio value="plantMaterial"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Chemical</ion-label>
          <ion-radio value="chemical"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Fertilizer</ion-label>
          <ion-radio value="fertilizer"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Soil Amendment</ion-label>
          <ion-radio value="soilAmendment"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Other Expenses</ion-label>
          <ion-radio value="other"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>All</ion-label>
          <ion-radio value="all"></ion-radio>
        </ion-item>
      </ion-list>
      <ion-list radio-group [(ngModel)]="order">
        <ion-list-header>Order By:</ion-list-header>
        <ion-item>
          <ion-label>Date Purchased</ion-label>
          <ion-radio value="date" (click)="close1()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Alphabetical</ion-label>
          <ion-radio value="alphabetical" (click)="close1()"></ion-radio>
        </ion-item>
      </ion-list>
    `
  })

export class PurchaseOrderPage{

    filter: string;
    order: string;

    constructor(public viewCtrl: ViewController, public navParams: NavParams){
      this.order = navParams.get('param1');
    }
    ionViewDidLoad(){
      this.filter="all";
    }
    close1(){
        this.viewCtrl.dismiss(this.order);
    }
}