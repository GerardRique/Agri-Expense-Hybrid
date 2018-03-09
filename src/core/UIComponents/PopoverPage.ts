import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";

@Component({
    template: `
      <ion-list>
        <ion-item *ngFor="let option of menuList">
            <button ion-button icon-left clear small (click)="close(option.title)">
                <ion-icon ios="{{option.iosIcon}}" md="{{option.mdIcon}}"></ion-icon>
                <div>{{option.title}}</div>
            </button>
        </ion-item>
    </ion-list>
    `
  })

export class PopoverPage{

    menuList: Array<Object>;
    constructor(public viewCtrl: ViewController, public navParams: NavParams){
        if('menu' in this.navParams.data){
            this.menuList = this.navParams.get('menu');
            console.log(this.menuList);
        }

        else throw new Error('Data must contain attribute menu');

    }

    close(options: string){
        let data = {
            options: options
        }
        this.viewCtrl.dismiss(data);
    }
}