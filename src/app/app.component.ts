import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CycleHandler } from '../core/CycleHandler';
import { PurchaseHandler } from '../core/PurchaseHandler';
import { NewCyclePage } from '../pages/new-cycle/new-cycle';
import { TabsPage } from '../pages/tabs/tabs';

import { HomePage } from '../pages/home/home';
import { NewPurchasePage } from '../pages/new-purchase/new-purchase';
import { LabourerListingPage } from '../pages/labourer-listing/labourer-listing';
import { DataManager } from '../core/DataManager';
import { LabourManager } from '../core/LabourManager';
import { MaterialManager } from '../core/MaterialManager';
import { Labourer } from '../core/Labourer';
import { UUID } from 'angular2-uuid';
@Component({
  templateUrl: 'app.html',
  providers: [CycleHandler, PurchaseHandler]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController;

  rootPage: any = TabsPage;

  pages: Array<{title: string, component: any}>;

  labourer: Labourer;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private cycleHandler: CycleHandler, private purchaseHandler: PurchaseHandler, private storage: Storage, private materialManager: MaterialManager){
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'New Cycle', component: NewCyclePage },
      { title: 'New Purchase', component: NewPurchasePage },
      { title: 'Labour', component: LabourerListingPage } 
    ];

    // this.storage.clear().then(() => {
    //   console.log("Cleared");
    // })




  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.materialManager.initialize().then((result) => {
        if(result === true)
          console.log("Initialized");
        else console.log("error");
      })

      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.navCtrl.push(page.component);
  }
}
