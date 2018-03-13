import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { PurchaseHandler } from '../../core/PurchaseHandler';
import { EditPurchasePage } from '../../pages/edit-purchase/edit-purchase';
import { PurchaseManager } from '../../core/PurchaseManager';
import { MaterialManager } from '../../core/MaterialManager';
import { App } from 'ionic-angular';
import { NewPurchasePage } from '../new-purchase/new-purchase';
import { Content } from 'ionic-angular/components/content/content';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { PopoverPage } from '../../core/UIComponents/PopoverPage';

/**
 * Generated class for the PurchaseListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-listing',
  templateUrl: 'purchase-listing.html',
})
export class PurchaseListingPage {

  purchaseListing: Array<any>;

  purchaseList: Array<Object>;

  displayEmptyListMessage: boolean;

  rootNav: any;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private purchaseHandler: PurchaseHandler, private purchaseManager: PurchaseManager, private materialManager: MaterialManager, private alertCtrl: AlertController, private app: App, private popOverCtrl: PopoverController, private toastCtrl: ToastController) {
    this.displayEmptyListMessage = false;
    this.rootNav = this.app.getRootNav();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseListingPage');
  }

  public openPurchaseOptionsPopover(myEvent, purchase, index){
    let list = [
      {
        'title': 'Edit',
        'iosIcon': 'md-create',
        'mdIcon': 'md-create'
      },
      {
        'title': 'Delete',
        'iosIcon': 'ios-trash',
        'mdIcon': 'md-trash'
      }
    ];

    let data = {
      'menu': list
    };
    let popover = this.popOverCtrl.create(PopoverPage, data);
    popover.present({
      ev: myEvent
    });

    let toast = this.toastCtrl.create({
      message: '',
      duration: 2000,
      position: 'middle'
    });

    popover.onDidDismiss((data) => {
      if(data === null)
        return 
      if(data.options.localeCompare('Delete') === 0){
        this.deletePurchase(purchase['id'], index);
      }
      else if(data.options.localeCompare('Edit') === 0){
        toast.setMessage('Editing...');
        toast.present();
      }
      else return;
    });
  }

  ionViewDidEnter(){
    this.loadData();
  }

  public loadData(){

    this.content.resize();

    this.purchaseManager.getAll().then((list) => {
      console.log(list);
      this.purchaseList = list.sort((a: Object, b: Object) => {
        return Date.parse(b['datePurchased']).valueOf() - Date.parse(a['datePurchased']).valueOf()
      });
      if(this.purchaseList.length === 0){
        this.displayEmptyListMessage = true;
      } else this.displayEmptyListMessage = false;
      this.getData();
    })
  }

  getData(): Promise<void>{
    let promises = [];
    for(let purchase of this.purchaseList){
      promises.push(this.purchaseManager.get(purchase['typeId']).then((type) => {
        purchase['typeName'] = type['name'];
      }));

      promises.push(this.materialManager.get(purchase['materialId']).then((material) => {
        purchase['materialImagePath'] = material['imagePath'];
      }));
    }

    return Promise.all(promises).then(() => {
      console.log('Successfully retrieved ' + this.purchaseList.length + ' purchases');
    });
  }

  public editPurchase(purchase, purchaseID): void{
    console.log("Editing Cycle: " + purchase);
    this.navCtrl.push(EditPurchasePage, purchase);
  }

  public goToNewPurchasePage(){
    this.rootNav.push(NewPurchasePage, {
      callback: this.loadData.bind(this)
    });
  }

  public deletePurchase(purchaseId, index): void{
    console.log("Deleting Purchase: " + purchaseId);
    let toast = this.toastCtrl.create({
      message: '',
      duration: 2000,
      position: 'bottom'
    });
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this purchase',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.purchaseManager.remove(purchaseId).then((response) => {
              if(response === true){
                console.log("Successfully Deleted Purchase: " + purchaseId);
                toast.setMessage('Successfully deleted purchase');
                toast.present();
                this.purchaseList.splice(index, 1);
                if(this.purchaseList.length === 0)
                  this.displayEmptyListMessage = true;
              }
            }).catch((error) => {
              console.log("Error removing Purchase: " + error);
              toast.setMessage('Error deleting purchase');
              toast.present();
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log("Cancled");
          }
        }
      ]
    });
    alert.present();
  }

}
