import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CycleHandler } from '../../core/CycleHandler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cycleListing: Array<any>;

  constructor(public navCtrl: NavController, private cycleHandler: CycleHandler) {
    
  }

  //The ionViewWillEnter will run when the page is fully entered and is now the active page. The event will fire whether it was the first load or a cached page. 
  ionViewDidEnter(){
    this.cycleHandler.getAll().then((list) => {
      console.log(list)
      this.cycleListing = list;
    })
  }

}
