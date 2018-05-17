import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { InitializePage } from '../initialize/initialize';
import { CountryManager } from '../../core/CountryModule/CountryManager';
/**
 * Generated class for the StartUpScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start-up-screen',
  templateUrl: 'start-up-screen.html',
})
export class StartUpScreenPage {

  @ViewChild(Slides) slides: Slides;

  private static FIRST_SLIDE_COLOR: string = "#9B18E7";

  private static SECOND_SLIDE_COLOR: string = "#2ECC71";

  private static THIRD_SLIDE_COLOR: string = "#47BFF3";

  private lock: boolean;

  private slideColor: string;

  private buttonText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private countryManager: CountryManager) {
    this.lock = false;

    this.buttonText = "Skip";

    this.slideColor = "#9B18E7";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartUpScreenPage');
  }

  skip(){
    this.navCtrl.pop();
  }

  nextSlide(){
    this.slides.slideNext();
  }

  ionViewDidLeave(){
    this.navCtrl.push(InitializePage);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log(this.slides.length());

    if(this.slides.length() === currentIndex){
      this.navCtrl.pop();
    }

    if(currentIndex === 0){
      this.buttonText = "Skip";
      this.slideColor = "#9B18E7";
    }

    if(currentIndex === 1){
      this.buttonText = "Skip";
      this.slideColor = "#2ECC71";
    }
    else if(currentIndex === 2){
      this.buttonText = "Next";
      this.slideColor = "#47BFF3";
    }
    console.log('Current index is', currentIndex);
  }

}
