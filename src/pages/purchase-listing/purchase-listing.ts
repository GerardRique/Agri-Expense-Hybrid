import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PurchaseHandler } from '../../core/PurchaseHandler';
import { EditPurchasePage } from '../../pages/edit-purchase/edit-purchase';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private purchaseHandler: PurchaseHandler, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseListingPage');
  }

  ionViewDidEnter(){
    this.purchaseHandler.getAll().then((list) => {
      this.purchaseListing = list;
    })
  }

  onHold(){
    console.log("Held");
  }

  public editPurchase(purchase, purchaseID): void{
    console.log("Editing Cycle: " + purchase);
    this.navCtrl.push(EditPurchasePage, purchase);
  }

  public deletePurchase(purchaseId, index): void{
    console.log("Deleting Purchase: " + purchaseId);
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this purchase',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.purchaseHandler.remove(purchaseId).then((response) => {
              if(response === true){
                console.log("Successfully Deleted Purchase: " + purchaseId);
                this.purchaseListing.splice(index, 1);
              }
            }).catch((error) => {
              console.log("Error removing Purchase: " + error);
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
