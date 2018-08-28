import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar, LoadingController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PlantMaterialManager } from '../../core/PlantMaterialManager';
import { AlertController } from 'ionic-angular';
import { PlantingMaterial } from '../../core/Models/Plantingmaterial';
import { Cycle } from '../../core/CyclesModule/Cycle';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import { ToastController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
/**
 * Generated class for the NewCyclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-cycle',
  templateUrl: 'new-cycle.html',
})
export class NewCyclePage {
  
  seeds = Array<Object>();
  readonly landTypes = ['Acre', 'Bed (sq metre)', 'Hectare', 'Square Feet', 'Square Metres', 'Square Miles']; // TODO -
  selectSeedTemplate = true;
  selectLandTypeTemplatePage = false;
  selectLandQuantityTemplatePage = false;

  callback: any;

  private newCycle: FormGroup;

  @ViewChild(Navbar) navbar: Navbar;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private plantMaterialManager: PlantMaterialManager,
              private alertCtrl: AlertController,
              private cycleManager: CycleManager,
              public toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private firebase: Firebase) {

    // Start the Spinner for loading content (will be dismissed when information returned successfully)
    const loadingSpinner = this.loadingCtrl.create({
      content: 'Loading Planting Material',
      enableBackdropDismiss: false,
      showBackdrop: false
    });
    loadingSpinner.present();

    this.plantMaterialManager.getAll().then((data) => {
      this.seeds = data;
      loadingSpinner.dismiss();
    });

    this.newCycle = this.formBuilder.group({
      name: ['', Validators.required],
      crop: ['', Validators.required],
      cropId: ['', Validators.required],
      cropImagePath: ['', Validators.required],
      landUnit: ['', Validators.required],
      landQuantity: ['', Validators.required],
      datePlanted: [new Date().toISOString(), Validators.required],
      harvested: [0.0, Validators.required],
      ongoing: [true, Validators.required]
    });
  }

  ionViewWillEnter(){
    this.callback = this.navParams.get('callback');
    
  }

  ionViewDidLoad() {
    //Set functionality for when the back button is pressed
    this.navbar.backButtonClick = () => {
      if(this.selectLandQuantityTemplatePage === true){
        this.selectLandQuantityTemplatePage = false;
        this.selectLandTypeTemplatePage = true;
      }
      else if(this.selectLandTypeTemplatePage === true){
        this.selectLandTypeTemplatePage = false;
        this.selectSeedTemplate = true;
      }
      else if(this.selectSeedTemplate === true){
        this.navCtrl.pop();
      }
    };
  }

  presentPromptForPlantMaterial(){
    let alert = this.alertCtrl.create({
      title: 'New Plant Material',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter Plant Material Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if(data.name.localeCompare("") === 0){
              console.log("Invalid Name");
            }else {
              let imagePath = "assets/img/plant_material.jpg";
              let plantMaterial = new PlantingMaterial(data.name, imagePath);
              this.plantMaterialManager.add(plantMaterial);
              this.seeds.push(plantMaterial);
            }
            console.log(data);
          } 
        }
      ]
    });
    alert.present();
  }

  goToSelectLandTypeTemplate(seed){
    this.newCycle.controls['crop'].setValue(seed.name);
    this.newCycle.controls['name'].setValue(seed.name);
    this.newCycle.controls['cropId'].setValue(seed.id);
    this.newCycle.controls['cropImagePath'].setValue(seed.imagePath);
    this.selectSeedTemplate = false;
    this.selectLandTypeTemplatePage= true;
  }

  goToSelectLandQuantityPage(landType){
    this.newCycle.controls['landUnit'].setValue(landType);
    this.selectLandTypeTemplatePage = false;
    this.selectLandQuantityTemplatePage = true;
  }

  submit(){
    // Start the Spinner for loading content (will be dismissed when information returned successfully)
    const loadingSpinner = this.loadingCtrl.create({
      content: 'Saving cycle ... ',
      enableBackdropDismiss: false,
      showBackdrop: false
    });
    loadingSpinner.present();

    let cycle = new Cycle(this.newCycle.get('name').value,
                            this.newCycle.get('crop').value,
                            this.newCycle.get('cropId').value,
                            this.newCycle.get('cropImagePath').value,
                            this.newCycle.get('landUnit').value,
                            this.newCycle.get('landQuantity').value,
                            this.newCycle.get('datePlanted').value,
                            this.newCycle.get('harvested').value,
                            this.newCycle.get('ongoing').value);

    this.firebase.logEvent("create_cycle", {content_type: "function_call", item_id: "new_cycle"});

    this.cycleManager.add(cycle).then((response) => {
      loadingSpinner.dismiss();

      this.toastCtrl.create({
        message: 'Cycle Successfully created',
        duration: 1000,
        position: 'bottom'
      }).present();

      this.callback();
      this.navCtrl.popToRoot();
    })
  }

}
