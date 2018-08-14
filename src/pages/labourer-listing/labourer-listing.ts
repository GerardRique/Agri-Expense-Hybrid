import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { NewLabourerPage } from '../new-labourer/new-labourer';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { DataManager } from '../../core/DataManager';
import { SelectCyclePage } from '../select-cycle/select-cycle';
import { FormControl } from '@angular/forms';

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

  displayEmptyListMessage: boolean;

  searchControl: FormControl;

  searchLabourer: string;

  @ViewChild(Content) content: Content;



  constructor(public navCtrl: NavController, public navParams: NavParams, private dataManagerFactory: DataManagerFactory){
    this.labourerListing = [];
    this.displayEmptyListMessage = false;

    this.searchLabourer = '';

    this.searchControl = new FormControl();

  }

  ionViewDidEnter(){
    this.labourManager = this.dataManagerFactory.getManager(DataManagerFactory.LABOUR);
    this.labourManager.getAll().then((list) => {
      this.labourerListing = list;
      console.log('Successfully retrieved ' + list.length + ' labourers');
      this.content.resize();
      if(this.labourerListing.length === 0){
        this.displayEmptyListMessage = true;
      } else this.displayEmptyListMessage = false;
    }).catch((error) => {
      console.log("Error retrieving labourers");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabourerListingPage');

    this.searchControl.valueChanges.debounceTime(700).subscribe((search) => {
      this.filterLabourers();
    });
  }

  filterLabourers(){
    return this.labourerListing.filter((item) => {
      return item['firstName'].toLowerCase().indexOf(this.searchLabourer.toLowerCase()) > -1;
    });
  }

  goToNewLabourerPage(){
    this.navCtrl.push(NewLabourerPage);
  }

  assignTask(labourer){
    this.navCtrl.push(SelectCyclePage, labourer);
  }

}
