import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { InitializePage } from '../initialize/initialize';
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

  private readonly FIRST_SLIDE_COLOR: string = "#9B18E7";
  private readonly SECOND_SLIDE_COLOR: string = "#2ECC71";
  private readonly THIRD_SLIDE_COLOR: string = "#47BFF3";

  private lock: boolean;
  private slideColor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lock = false;
    this.slideColor = this.FIRST_SLIDE_COLOR;
  }

  skip(){
    this.navCtrl.pop();
  }

  finish(){
    this.navCtrl.pop();
  }

  nextSlide(){
    this.slides.slideNext();
  }

  previousSlide(){
    this.slides.slidePrev();
  }

  ionViewDidLeave(){
    this.navCtrl.push(InitializePage);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();

    if(currentIndex === 0){
      this.slideColor = this.FIRST_SLIDE_COLOR;
    }

    if(currentIndex === 1){
      this.slideColor = this.SECOND_SLIDE_COLOR;
    }
    else if(currentIndex === 2){
      this.slideColor = this.THIRD_SLIDE_COLOR;
    }
  }

}
