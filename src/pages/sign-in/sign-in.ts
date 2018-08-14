import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../core/AunthenticationService';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  displayName: string;

  displaySignInTemplate: boolean;

  displayAlreadySignedInTemplate: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authenticationService: AuthenticationService, public afAuth: AngularFireAuth) {
    this.displayAlreadySignedInTemplate = false;
    this.displayName = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  ionViewDidEnter(){
    console.log('Logging In');
    this.authenticationService.checkAuthentication().subscribe((user: firebase.User) => {
      if(!user){
        //this.authenticationService.signInWithGoogle();
        this.displaySignInTemplate = true;
        this.displayAlreadySignedInTemplate = false;
      } 
      else{
        this.displayAlreadySignedInTemplate = true;
        this.displaySignInTemplate = false;
        this.displayName = user.displayName;
      }
    })
  }

  public signIn(){
    this.authenticationService.signInWithGoogle();
  }

  public signOut(){
    this.authenticationService.signOut();
  }

  public checkAuthentication(){
    this.afAuth.authState.subscribe((user : firebase.User) => {
        if(!user){
            this.authenticationService.signInWithGoogle();
        }
         else{
           this.displayName = user.displayName;
            console.log(user);
         }
    });
}

}
