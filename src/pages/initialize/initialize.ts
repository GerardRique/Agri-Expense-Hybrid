import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { AuthenticationService } from '../../core/AunthenticationService';
import { InitializeData } from '../../core/InitializationModule/InitializeData';
import { CountryManager } from '../../core/CountryModule/CountryManager';
import { Storage } from '@ionic/storage';
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
  // Location configuration
  private countries: Array<Object>;
  private counties: Array<string>;
  private userCountry: Object;
  private userCounty: string;
  private subDivisionTitle: string;
  // Alarm and Sync configuration
  private alarmTime: any;
  private userDataSyncTime: string;
  private chosenHours: number;
  private chosenMinutes: number;
  // Sign-in configuration
  private displaySignInButton: boolean;
  private userSignedIn: boolean;
  private countryCheck: boolean;

  constructor(public storage: Storage,
              public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              private countryManager: CountryManager,
              private authenticationService: AuthenticationService,
              private measurableDataManagerFactory: MeasurableDataManagerFactory,
              private initializeData: InitializeData,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private dataSync :DataSynchronization,
              private localNotifications: LocalNotifications) { // End the parameter for constructor


    this.countryManager.initialize().then(result => {
      // When we initialise the country manager, we configure defaults before requsting countries

      // We set the alarm time (to be displayed and default) to 4:00 pm
      this.alarmTime = new Date("2018-09-03T16:00:21.123Z").toISOString();
      this.chosenHours = 4;
      this.chosenMinutes = 0;
      // Configure the default sync time to the current time
      this.userDataSyncTime = new Date("2018-09-03T16:00:21.123Z").toISOString();

      this.counties = Array<string>();
      this.countryCheck = true;
      this.userCounty = "";
      this.subDivisionTitle = "Area";

      this.userSignedIn = false;
      this.displaySignInButton = true;

      // Retrieve countries
      this.countryManager.getAll().then(list => {
        this.countries = list;
        console.log("Retrieved " + this.countries.length + " countries");
      })
    }).catch(console.error);
  }

  runInitialization(){
    return this.initializeData.initializeApp();
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
    this.countryCheck = false;
    this.subDivisionTitle = this.userCountry['subDivisionTitle'];

    this.countryManager.getCounties(this.userCountry['id']).then((list) => {
      this.counties = list;
      console.log("Retrieved " + this.counties.length + " counties for " + this.userCountry['name']);
    })
  }

  setAlarmTime(){
    console.log("Alarm time was configured as (%s:%s)",this.chosenHours, this.chosenMinutes);

    let notificationTime = new Date();
    notificationTime.setHours(this.chosenHours);
    notificationTime.setMinutes(this.chosenMinutes);
    notificationTime.setSeconds(0);
    this.platform.ready().then(() => {

      let notification = {
        id: 1,
        title: 'Farming Record Reminder',
        text: 'Remember to enter the records of your farming activity for today.',
        trigger: { every: {hour: this.chosenHours, minute: this.chosenMinutes }}
      };

      if(this.platform.is('cordova')) {
        // @ts-ignore
        this.localNotifications.schedule(notification);
      }

      this.runInitialization();

    });
  }

  setDataScheduleTime(){

  }

  saveData(){
    this.initializeData.checkAppInitialization().then((result) => {
      // TODO - check initialisation - unclear why it would return true
      if(result === true){
        this.navCtrl.pop();
      }
      else{
        // Configure Alarm time
        this.setAlarmTime();
        // Configure Schedule for uploading data
        this.setDataScheduleTime();

        this.navCtrl.pop();
      }
    })

  }

}
