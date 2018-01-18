import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CycleDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cycle-data',
  templateUrl: 'cycle-data.html',
})
export class CycleDataPage {

  totalAmountSpentMessage: string;
  totalAmountSpent: number

  fertilizer: string;
  chemical: string;
  plantMaterial: string;
  soilAmmendment: string;
  labour: string;
  other: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.totalAmountSpent = 0.0;

    this.totalAmountSpentMessage = "has been spent on";
    this.fertilizer = "fertilizers";
    this.chemical = "chemicals";
    this.plantMaterial = "planting materials";
    this.soilAmmendment = "soil ammendments";
    this.labour = "labour"
    this.other = "other materials";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CycleDataPage');
  }

}
