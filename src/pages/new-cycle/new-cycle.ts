import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CycleHandler } from '../../core/CycleHandler';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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

  seeds = ['Anise Seed', 'Banana', 'Basil', 'Bay Leaf', 'Beet', 'Bhagi', 'Bora(Bodi) Bean'];
  landTypes = ['Acre', 'Bed', 'Hectare'];
  selectSeedTemplate = true;
  selectLandTypeTemplatePage = false;
  selectLandQuantityTemplatePage = false;

  private newCycle: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cycleHandler: CycleHandler, private formBuilder: FormBuilder) {
    this.newCycle = this.formBuilder.group({
      name: ['', Validators.required],
      crop: ['', Validators.required],
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

  goToSelectLandTypeTemplate(seed){
    this.newCycle.controls['crop'].setValue(seed);
    this.newCycle.controls['name'].setValue(seed);
    this.selectSeedTemplate = false;
    this.selectLandTypeTemplatePage= true;
  }

  goToSelectLandQuantityPage(landType){
    this.newCycle.controls['landUnit'].setValue(landType);
    this.selectLandTypeTemplatePage = false;
    this.selectLandQuantityTemplatePage = true;
  }

  submit(){
    console.log(this.newCycle);
    this.cycleHandler.add(this.newCycle.value).then((response) => {
      console.log(response);
      this.navCtrl.pop();
    })
  }

}
