import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PlantMaterialManager } from '../../core/PlantMaterialManager';
import { CycleManager } from '../../core/CycleManager';
/**
 * Generated class for the EditCyclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-cycle',
  templateUrl: 'edit-cycle.html',
})
export class EditCyclePage {

  private editedCycle: FormGroup;

  private plantMaterialList: Array<Object>;
  //TODO: Create class for units. 
  private landUnitList = ['Acre', 'Bed', 'Hectare'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private plantMaterialManager: PlantMaterialManager, private cycleManager: CycleManager) {

    this.plantMaterialManager.getAll().then((data) => {
      this.plantMaterialList = data.slice();
    });


    this.editedCycle = this.formBuilder.group({
      id: [this.navParams.get('id')],
      name: [this.navParams.get('name'), Validators.required],
      crop: [''],
      cropId: [this.navParams.get('cropId'), Validators.required],
      cropImagePath: [''],
      landUnit: [this.navParams.get('landUnit'), Validators.required],
      landQuantity: [this.navParams.get('landQuantity'), Validators.required],
      datePlanted: [this.navParams.get('datePlanted'), Validators.required],
      harvested: [this.navParams.get('harvested')],
      ongoing: [this.navParams.get('ongoing'),]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCyclePage');
  }

  updateCropName(){
    console.log("Updating crop name...");
  }

  public editCycle(): void{
    this.plantMaterialManager.getData(this.editedCycle.get('cropId').value).then((cropData) => {
      this.editedCycle.controls['crop'].setValue(cropData['name']);
      this.editedCycle.controls['cropImagePath'].setValue(cropData['imagePath']);

      console.log(this.editedCycle.value);

      this.cycleManager.edit(this.navParams.get('id'), this.editedCycle.value).then((response) => {
        if(response === true){
          console.log('Successfully edited cycle: ' + this.navParams.get('id'));
          this.navCtrl.pop();
        }
        else console.log('Error editing cycle');
      }).catch((error) => {
        console.log('Error editing cycle: + ' + JSON.stringify(error));
      })

    }).catch((error) => {
      console.log("Error retrieving crop data for updating cycle");
    });
  }

}
