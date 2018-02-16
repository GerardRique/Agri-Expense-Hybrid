import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PlantMaterialManager } from '../../core/PlantMaterialManager';
import { AlertController } from 'ionic-angular';
import { PlantingMaterial } from '../../core/Models/Plantingmaterial';
import { Cycle } from '../../core/CyclesModule/Cycle';
import { CycleManager } from '../../core/CyclesModule/CycleManager';
import { ToastController } from 'ionic-angular';
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
  landTypes = ['Acre', 'Bed', 'Hectare'];
  selectSeedTemplate = true;
  selectLandTypeTemplatePage = false;
  selectLandQuantityTemplatePage = false;

  private newCycle: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private plantMaterialManager: PlantMaterialManager, private alertCtrl: AlertController, private cycleManager: CycleManager, public toastCtrl: ToastController) {

    this.plantMaterialManager.getAll().then((data) => {
      this.seeds = data;
    })
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
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCyclePage');
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
    let cycle = new Cycle(this.newCycle.get('name').value, this.newCycle.get('crop').value, this.newCycle.get('cropId').value, this.newCycle.get('cropImagePath').value, this.newCycle.get('landUnit').value, this.newCycle.get('landQuantity').value, this.newCycle.get('datePlanted').value, this.newCycle.get('harvested').value, this.newCycle.get('ongoing').value);
    console.log(cycle);

    this.cycleManager.add(cycle).then((response) => {
      let toast = this.toastCtrl.create({
        message: 'Cycle Successfully created',
        duration: 3000,
        position: 'top'
      });

      toast.present();
      console.log('Cycle Manager test successfull');
      this.navCtrl.popToRoot();
    })
  }

}
