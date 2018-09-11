import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
    template: `
      <ion-list radio-group [(ngModel)]="filter">
        <ion-list-header>Filter Purchases By:</ion-list-header>
        <ion-item>
          <ion-label>Plant Material</ion-label>
          <ion-radio value="plantMaterial" (click)="close1()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Chemical</ion-label>
          <ion-radio value="chemical" (click)="close1()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Fertilizer</ion-label>
          <ion-radio value="fertilizer" (click)="close1()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Soil Amendment</ion-label>
          <ion-radio value="soilAmendment" (click)="close1()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Other Expenses</ion-label>
          <ion-radio value="other" (click)="close1()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>All</ion-label>
          <ion-radio value="all" (click)="close1()"></ion-radio>
        </ion-item>
      </ion-list>
      <ion-list radio-group [(ngModel)]="order">
        <ion-list-header>Order Purchases By:</ion-list-header>
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
      this.filter = navParams.get('param2');
    }
    ionViewDidLoad(){
    }
    close1(){
        let data = {
          'order': this.order,
          'filter': this.filter
        };
        this.viewCtrl.dismiss(data);
    }
}