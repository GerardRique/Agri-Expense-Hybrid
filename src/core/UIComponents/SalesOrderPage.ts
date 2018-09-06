import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
    template: `
      <ion-list>
        <ion-list-header>Order By:</ion-list-header>
        <button ion-item (click)="close('date')">Date</button>
        <button ion-item (click)="close('alphabetical')">Alphabetical</button>
      </ion-list>
    `
  })

export class SalesOrderPage{

    constructor(public viewCtrl: ViewController, public navParams: NavParams){
    }

    close(item){
        this.viewCtrl.dismiss(item);
    }
}