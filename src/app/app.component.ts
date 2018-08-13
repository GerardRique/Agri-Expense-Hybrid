import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, AlertController, ToastController } from 'ionic-angular';
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
import { ManageDataPage } from '../pages/manage-data/manage-data';
import { Observable } from '@firebase/util';
import { InitializeData } from '../core/InitializationModule/InitializeData';
import { InitializePage } from '../pages/initialize/initialize';
import { StartUpScreenPage } from '../pages/start-up-screen/start-up-screen';
import { LocalNotifications, ILocalNotificationActionType, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
import { Firebase } from '@ionic-native/firebase';


declare let cordova: any;

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

  m: MeasurableDataManager;

  

  public static USER_ACCOUNT_CHECK: string = "user_account";

  constructor(public platform: Platform, public statusBar: StatusBar,public storage: Storage, public splashScreen: SplashScreen, private initializeData: InitializeData, private authenticationService: AuthenticationService, private alertCtrl: AlertController, private localNotification: LocalNotifications, private toastCtrl: ToastController, private firebase: Firebase){
    this.initializeApp();

    this.firebase.setAnalyticsCollectionEnabled(true);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Hire Labour', component: LabourerListingPage },
      { title: 'Reports ', component: ReportListingPage }
    ];

    let signInPage = { title: 'Sign In', component: SignInPage };

    let manageAccountPage = { title: 'Manage Account', component: SignInPage};

    let dataManagePage = { title: 'Manage Data', component: ManageDataPage };

    

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
        //Provide the user with the option to manage online data if they are signed in
        this.pages.push(dataManagePage);
      }
    })

    

  }

  initializeApp() {
    this.platform.ready().then(() => {

      // this.storage.clear().then(() => {
      //   console.log('Cleared');
      // });
    
      this.initializeData.checkAppInitialization().then((result) => {
        if(result === true){
          console.log("Appication already initialized");
        }
        else{
          this.navCtrl.push(StartUpScreenPage);
          //this.navCtrl.push(InitializePage);
        }
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

  public presentSignInOffer(acceptFunction?, declineFunction?){
    let alert = this.alertCtrl.create({
      title: "Sign In to Agri Expense",
      message: "Would you like to sign in to Agri Expense? ",
      buttons: [
        {
          text: 'Sign me in',
          handler: () => {
            console.log('Signin In');
          }
        },
        {
          text: "No Thank You",
          handler: () => {
            console.log('Sign In cancelled');
          }
        }
      ]
    });
    alert.present();
  }

    
}
