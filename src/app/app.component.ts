import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CycleHandler } from '../core/CycleHandler';
import { PurchaseHandler } from '../core/PurchaseHandler';
import { NewCyclePage } from '../pages/new-cycle/new-cycle';
import { TabsPage } from '../pages/tabs/tabs';
import * as firebase from 'firebase/app';
import { HomePage } from '../pages/home/home';
import { NewPurchasePage } from '../pages/new-purchase/new-purchase';
import { LabourerListingPage } from '../pages/labourer-listing/labourer-listing';
import { ReportsPage } from '../pages/reports/reports';
import { DataManager } from '../core/DataManager';
import { LabourManager } from '../core/LabourManager';
import { MaterialManager } from '../core/MaterialManager';
import { Labourer } from '../core/Labourer';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from '../core/MeasurableDataManager';
import { FertilizerManager } from '../core/FertilizerManager';
import { ReportCreator } from '../core/ReportCreator';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { HarvestManager } from '../core/HarvestManager';
import { ChemicalsManager } from '../core/ChemicalsManager';
import { SoilAmendmentsManager } from '../core/SoilAmendmentsManager';
import { PlantingMaterial } from '../core/Models/Plantingmaterial';
import { PlantMaterialManager } from '../core/PlantMaterialManager';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ReportListingPage } from '../pages/report-listing/report-listing';
import { AuthenticationService } from '../core/AunthenticationService';

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

  m: MeasurableDataManager

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, private materialManager: MaterialManager, private labourManager: LabourManager, private harvestManager: HarvestManager, private fertilizerManager: FertilizerManager, private chemicalManager: ChemicalsManager, private soilAmmendmentManager: SoilAmendmentsManager, private plantMaterialManager: PlantMaterialManager, private authenticationService: AuthenticationService){
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'New Cycle', component: NewCyclePage },
      { title: 'New Purchase', component: NewPurchasePage },
      { title: 'Hire Labour', component: LabourerListingPage },
      { title: 'Reports ', component: ReportListingPage }
    ];

    let signInPage = { title: 'Sign In', component: SignInPage };

    let manageAccountPage = { title: 'Manage Account', component: SignInPage};

    //We must determine if the user is signed in so that, in the side menu, we can either display a button to navigate to the sign in page if the user is not signed in or a button to navigate to the manage accounts page if the user has signed in.
    //Using the authentication service, we can check if the user is signed in.
    this.authenticationService.checkAuthentication().subscribe((user: firebase.User) => {
      if(!user){
        //If the user is not signed in, we must display a button to naviagte to the sign in page.
        //We must first check if the manage accounts page is already in  the menu. If it is we must remove it because the user is not logged in.
        let index = this.pages.indexOf(manageAccountPage);
        if(index > -1){
          //Remove the manage accounts page from the menu if it existed yet. 
          this.pages.splice(index, 1);
        }
        //Add the sign in page to the menu listing. 
        this.pages.push(signInPage);
      } 
      else{
        let index = this.pages.indexOf(signInPage);
        if(index > -1){
          this.pages.splice(index, 1);
        }
        this.pages.push(manageAccountPage);
      }
    })

    // this.storage.clear().then(() => {
    //   console.log("Cleared");
    // })

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.materialManager.checkInitialization().then((response) => {
        if(response === true){
          console.log('Plant material manager already initialized');
        }
        else {
          this.materialManager.initialize();
        }

        this.fertilizerManager.checkInitialization().then((response) => {
          if(response === true) console.log('Fertilizer manager already initialized');

          else this.fertilizerManager.initialize();
        });

        this.plantMaterialManager.checkInitialization().then((reponse) => {
          if(response === true)console.log('Plant material manager already initialized');

          else this.plantMaterialManager.initialize();
        })

        this.chemicalManager.checkInitialization().then((response) => {
          if(response === true)console.log('Chemical manager already initialized');

          else this.chemicalManager.initialize();
        })

        this.soilAmmendmentManager.checkInitialization().then((response) => {
          if(response === true)console.log('Soil Ammendment manager already initialized');

          else this.soilAmmendmentManager.initialize();
        })
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.harvestManager.checkInitialization().then((result) => {
      if(result === true){
        console.log('Harvest Manager already initialized');
      }
      else{
        this.harvestManager.initialize();
      }
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.navCtrl.push(page.component);
  }
}
