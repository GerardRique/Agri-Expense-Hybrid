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
import { DataManager } from '../core/DataManager';
import { PlantMaterialManager } from '../core/PlantMaterialManager';
import { ChemicalsManager } from '../core/ChemicalsManager';
import { FertilizerManager } from '../core/FertilizerManager';
import { SoilAmendmentsManager } from '../core/SoilAmendmentsManager';
import { MaterialManager } from '../core/MaterialManager';
@Component({
  templateUrl: 'app.html',
  providers: [CycleHandler, PurchaseHandler]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController;

  rootPage: any = TabsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private cycleHandler: CycleHandler, private purchaseHandler: PurchaseHandler, private plantMaterialManager: PlantMaterialManager, private storage: Storage, private chemicalManager: ChemicalsManager, private fertilizerManager: FertilizerManager, private soilAmendmentsManager: SoilAmendmentsManager, private materialManager: MaterialManager){
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'New Cycle', component: NewCyclePage },
      { title: 'New Purchase', component: NewPurchasePage }
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

  initializeMaterials(): Promise<boolean>{
    let materialList = [this.plantMaterialManager.DATA_ID, this.chemicalManager.DATA_ID, this.fertilizerManager.DATA_ID, this.soilAmendmentsManager.DATA_ID];
    let materialListString = JSON.stringify(materialList);
    return this.storage.ready().then(() => {
      return this.storage.get('MaterialList').then((list) => {
        if(list === null){
          return this.storage.set('MaterialList', materialListString).then(() => {
            console.log("Initialized Material List");
            return true;
          }).catch((error) => {
            return false;
          });
        } else {
          console.log("Material List Already Inilialized");
          return true;
        }
      });
    }).catch((error) => {
      return false;
    })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.navCtrl.push(page.component);
  }
}
