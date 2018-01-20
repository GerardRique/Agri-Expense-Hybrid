import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewLabourerPage } from '../new-labourer/new-labourer';
import { LabourManager } from '../../core/LabourManager';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { DataManager } from '../../core/DataManager';
import { Labourer } from '../../core/Labourer';
import { ListTemplate } from '../../core/ListTemplate';
import { SelectCyclePage } from '../select-cycle/select-cycle';

/**
 * Generated class for the LabourerListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labourer-listing',
  templateUrl: 'labourer-listing.html',
})
export class LabourerListingPage {

  private labourManager: DataManager;

  labourerListing: Array<Object>;



  constructor(public navCtrl: NavController, public navParams: NavParams, private dataManagerFactory: DataManagerFactory){
    this.labourerListing = [];
    this.labourManager = this.dataManagerFactory.getManager(DataManagerFactory.LABOUR);
    this.labourManager.getAll().then((list) => {
      this.labourerListing = list;
    }).catch((error) => {
      console.log("Error retrieving labourers");
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabourerListingPage');
  }

  goToNewLabourerPage(){
    this.navCtrl.push(NewLabourerPage);
  }

  assignTask(labourer){
    this.navCtrl.push(SelectCyclePage, labourer);
  }

}
