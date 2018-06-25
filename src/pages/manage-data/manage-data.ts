import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataSynchronization } from '../../core/Backened/DataSynchronization';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../../core/AunthenticationService';
import { PurchaseManager } from '../../core/PurchaseManager';
import { LabourManager } from '../../core/LabourManager';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { DataManager } from '../../core/DataManager';

import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

/**
 * Generated class for the ManageDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-data',
  templateUrl: 'manage-data.html',
})
export class ManageDataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataSynchronization: DataSynchronization, public authenticationService: AuthenticationService, public dataManagerFactory: DataManagerFactory , public cycleManager: CycleManager, public purchaseManager: PurchaseManager, public labourManager: LabourManager, private notification: PhonegapLocalNotification, private toastCtrl: ToastController) {

    this.notification.requestPermission().then(
      (permission) => {
        if (permission === 'granted') {

          console.log('Permission granted');
    
          // Create the notification
          this.notification.create('Agri Expense', {
            tag: 'AgriExpense',
            body: 'Agri Expense Reminder',
            icon: 'assets/icon/icon.png',
          });
    
        }
      }
    );
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageDataPage');
  }


  upload(){

    let toast = this.toastCtrl.create({
      message: 'success',
      position: 'middle',
      duration: 5000
    });

    this.dataSynchronization.uploadData();

    // let dataManagerList: Array<string> = [
    //   DataManagerFactory.CYCLE,
    //   DataManagerFactory.PURCHASE,
    //   DataManagerFactory.SALE,
    //   DataManagerFactory.LABOUR,
    //   DataManagerFactory.MATERIAL,
    //   DataManagerFactory.TASK,
    //   DataManagerFactory.HARVEST,
    //   DataManagerFactory.MATERIAL_USE,
    //   DataManagerFactory.PLANT_MATERIAL,
    //   DataManagerFactory.FERTILIZER,
    //   DataManagerFactory.CHEMICAL,
    //   DataManagerFactory.SOIL_AMMENDMENT
    // ];

    // let dataManagers = Array<DataManager>();

    // for(let id of dataManagerList){
    //   dataManagers.push(this.dataManagerFactory.getManager(id));
    // }


    // this.authenticationService.checkAuthentication().subscribe((user: firebase.User) => {
    //   if(!user){
    //     console.log('Error');
    //   }
    //   else {
    //     console.log(user);
    //     this.dataSynchronization.syncAll(dataManagers, user.uid).subscribe((result: boolean) => {
    //       if(result === true){
    //         console.log('Success');
    //         toast.present();
    //       }
    //       else{
    //         console.log('Error');
    //       }
    //     })
        
    //   }
    // })
  }

}
