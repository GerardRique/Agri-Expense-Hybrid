import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/AunthenticationService';
import { InitializeData } from '../../core/InitializationModule/InitializeData';
import { CountryManager } from '../../core/CountryModule/CountryManager';
import { DataManager } from '../../core/DataManager';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { DataSynchronization } from '../../core/Backened/DataSynchronization';
import { MeasurableDataManagerFactory } from '../../core/MeasurableDataManagerFactory';
import { MeasurableDataManager } from '../../core/MeasurableDataManager';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
This page is a setup up page that will be run after the Application is first installed. 
 */

@IonicPage()
@Component({
  selector: 'page-initialize',
  templateUrl: 'initialize.html',
})
export class InitializePage {

  private countries: Array<Object>;
  private counties: Array<string>;

  private userCountry: Object;
  private alarmTime: any;
  private userCounty: string;
  private userSignedIn: boolean;
  private userDataSyncTime: string;

  private displaySignInButton: boolean;

  private subDivisionTitle: string;

  private chosenHours: number;
  private chosenMinutes: number;

  constructor(public storage: Storage, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private countryManager: CountryManager, private authenticationService: AuthenticationService, private measurableDataManagerFactory: MeasurableDataManagerFactory, private dataManagerFactory: DataManagerFactory, private initializeData: InitializeData, private toastCtrl: ToastController, private alertCtrl: AlertController, private dataSync :DataSynchronization, private localNotifications: LocalNotifications) {
    console.log("Running first initialization...");


    this.countryManager.initialize().then((result) => { 
        this.alarmTime = moment(new Date(9, 0, 0)).format();
        this.userDataSyncTime = new Date().toISOString();
        this.userSignedIn = false;
        this.displaySignInButton = true;

        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();

        this.counties = Array<string>();

        this.subDivisionTitle = "county";

        this.countryManager.getAll().then((list) => {
          this.countries = list;
          console.log("Retrieved " + this.countries.length + " countries");
        })
    }).catch((error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitializePage');
  }

  runInitialization(){
    console.log('Running...');
    this.initializeData.initializeApp().then((result) => {
      if(result === true){
        console.log('Application successfully installed');
      }else{
        console.log("Error initializing Application");
      }
    })
  }

  signInWithGoogle(){
    this.authenticationService.signInWithGoogle().then((response) => {
      let toast = this.toastCtrl.create({
        message: 'Successfully signed In',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.userSignedIn = true;
      this.displaySignInButton = false;
      this.authenticationService.checkForExistingData().subscribe((result: boolean) => {
        if(result === true){
          console.log("Exists");
          this.presentDataSyncAlert();
        }
        else{
          //Previous account does not exists. Running normall all initialization.
          console.log("Does not Exists");
          this.runInitialization();
        }
      })
    }).catch((error) => {
      let errorToast = this.toastCtrl.create({
        message: "Error signing in.",
        duration: 5000,
        position: "bottom"
      });
      errorToast.present();
      console.log(error);
    })
  }

  presentDataSyncAlert(){
    let confirmToast = this.toastCtrl.create({
      message: 'Successfuly saved data from online',
      duration: 3000,
      position: 'bottom'
    });
    let dataSyncAlert = this.alertCtrl.create({
      title: 'Sync Data with Google Account',
      message: 'You already have an account with existing data. Would you reuse this data? ',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Gonna sync data');
            this.dataSync.pullData().subscribe((response: boolean) => {
              console.log("Data Saved");
              this.initializeData.setAppInitializetion();
              this.initializeAllUnits();
              confirmToast.present();
            })
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('They dont wanna sync');
          }
        }
      ]
    });
    dataSyncAlert.present();
  }

  initializeAllUnits(){
    let list = Array<MeasurableDataManager>();

    list.push(this.measurableDataManagerFactory.getManager(MeasurableDataManagerFactory.PLANT_MATERIAL));
    list.push(this.measurableDataManagerFactory.getManager(MeasurableDataManagerFactory.FERTILIZER));
    list.push(this.measurableDataManagerFactory.getManager(MeasurableDataManagerFactory.CHEMICAL));
    list.push(this.measurableDataManagerFactory.getManager(MeasurableDataManagerFactory.SOIL_AMENDMENT));

    let promises = [];

    for(let dataManager of list){
      promises.push(dataManager.initializeUnits());
    }

    return Promise.all(promises).then(() => {
      return true;
    }).catch((error) => {
      console.error(error);
      return false;
    })
  }

  changeTime(time){
    console.log("Time change");
    let chosenTime = new Date(this.alarmTime);
    this.chosenHours = chosenTime.getHours();;
    this.chosenMinutes = chosenTime.getMinutes();
  }

  selectCountry(){
    this.userCounty = "";
    let countryId = this.userCountry['id'];
    let countryName = this.userCountry['name'];
    let subDivisionTitle = this.userCountry['subDivisionTitle'];
    this.subDivisionTitle = subDivisionTitle;
    console.log("Selected Country: " + countryName);

    console.log(subDivisionTitle);

    this.countryManager.getCounties(countryId).then((list) => {
      this.counties = list;
      console.log("Retrieved " + this.counties.length + " counties for " + countryName);
    })
  }


  saveData(){
    this.initializeData.checkAppInitialization().then((result) => {
      if(result === true){
        this.navCtrl.pop();
      }
      else{

        let notificationTime = new Date();

        console.log(this.chosenHours);

        console.log(this.chosenMinutes);

        notificationTime.setHours(this.chosenHours);
        notificationTime.setMinutes(this.chosenMinutes);
        notificationTime.setSeconds(0);

        let toast = this.toastCtrl.create({
          message: 'Hey There',
          position: 'middle',
          duration: 5000
        });

        

        console.log(notificationTime);

        let currentDate = new Date(new Date().getTime() + 3600);
        console.log(notificationTime);
        console.log(currentDate);

        this.platform.ready().then(() => {
          let notification = {
            id: 1,
            title: 'AgriExpense!',
            text: 'Hey, just reminding you to enter your data.',
            at: notificationTime,
            every: 'minute'
          };
      
          if(this.platform.is('cordova')){
            this.localNotifications.schedule(notification);
            this.localNotifications.on('trigger').subscribe(() => {
              //this.dataManagerPage.upload();
              toast.present();
              //this.dataSync.uploadData();
            })
          }
          this.runInitialization();
          this.navCtrl.pop();
        });
        
      }
    })
    
  }

}
