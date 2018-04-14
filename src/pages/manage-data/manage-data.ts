import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataSynchronization: DataSynchronization, public authenticationService: AuthenticationService, public dataManagerFactory: DataManagerFactory , public cycleManager: CycleManager, public purchaseManager: PurchaseManager, public labourManager: LabourManager, private notification: PhonegapLocalNotification) {

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

    let dataManagers = Array<DataManager>();

    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.CYCLE));
    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.PURCHASE));
    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.SALE));

    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.LABOUR));

    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.MATERIAL));

    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.TASK));


    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.HARVEST));

    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.MATERIAL_USE));
    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.PLANT_MATERIAL));
    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.FERTILIZER));
    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.CHEMICAL));
    dataManagers.push(this.dataManagerFactory.getManager(DataManagerFactory.SOIL_AMMENDMENT));

    this.authenticationService.checkAuthentication().subscribe((user: firebase.User) => {
      if(!user){
        console.log('Error');
      }
      else {
        console.log(user);
        this.dataSynchronization.syncAll(dataManagers, user.uid).subscribe((result: boolean) => {
          if(result === true){
            console.log('Success');
          }
          else{
            console.log('Error');
          }
        })
        
      }
    })
  }

}
