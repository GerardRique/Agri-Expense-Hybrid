import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataManagerFactory } from '../../core/DataManagerFactory';
import { DataManager } from '../../core/DataManager';
import { Labourer } from '../../core/Labourer';
import { Firebase } from '@ionic-native/firebase';

/**
 * Generated class for the NewLabourerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-labourer',
  templateUrl: 'new-labourer.html',
})
export class NewLabourerPage {

  private newLabourer: FormGroup;
  private labourManager: DataManager;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private dataManagerFactory: DataManagerFactory, private firebase: Firebase) {
    this.labourManager = this.dataManagerFactory.getManager(DataManagerFactory.LABOUR);

    this.newLabourer = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: [''] //Gerard check to see if i did this correctly, I just removed the Validators.required
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewLabourerPage');
  }

  submit(){
    this.firebase.logEvent("save_labourer", {content_type: "function_call", item_id: "new_labourer"});
    let myLabourer = new Labourer(this.newLabourer.get('firstName').value, this.newLabourer.get('lastName').value, this.newLabourer.get('contactNumber').value);
    console.log(JSON.stringify(myLabourer));
    this.labourManager.add(myLabourer).then((result) => {
      if(result === true){
        console.log("Successfully saved new labourer");
        this.navCtrl.pop();
      }
      else console.log("Error saving this labourer");
    }).catch((error) => {
      console.log("Error saving labourer: " + error);
    });
  }

}
