import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
    template: `
      <ion-list radio-group [(ngModel)]="filter">
        <ion-list-header>Filter Cycles By:</ion-list-header>
        <ion-item>
          <ion-label>Open</ion-label>
          <ion-radio value="open" (click)="close()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>Closed</ion-label>
          <ion-radio value="close" (click)="close()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>All</ion-label>
          <ion-radio value="all" (click)="close()"></ion-radio>
        </ion-item>
      </ion-list>
      <ion-list radio-group [(ngModel)]="order">
        <ion-list-header>Order Cycles By:</ion-list-header>
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

    filter: string;
    order: string;

    constructor(public viewCtrl: ViewController, public navParams: NavParams){
      this.order = navParams.get('param1');
      this.filter = navParams.get('param2');
    }

    close(){
        let data = {
          'order': this.order,
          'filter': this.filter
        };
        this.viewCtrl.dismiss(data);
    }
}