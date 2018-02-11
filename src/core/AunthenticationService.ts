import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthenticationService{

    constructor(db: AngularFirestore, public afAuth: AngularFireAuth, public toastCtrl: ToastController, private platform: Platform){
        
    }

    public signInWithGoogle(){
        if(this.platform.is('cordova')){
            this.signInWithGoogleOnDevice();
        }
        else {
            this.signInWithGoogleOnBrowser();
        }
    }

    public signInWithGoogleOnBrowser(){
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
            console.log(response);
        })
    }

    public checkAuthentication(): Observable<firebase.User>{
        return this.afAuth.authState.map((data) => {
            return data;
        })
    }

    public signInWithGoogleOnDevice(){
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(() => {
            return firebase.auth().getRedirectResult();
        }).then((result) => {
            let token = result.credential.accessToken;

            let user = result.user;
        }).catch((error) => {
            let toast = this.toastCtrl.create({
                message: error.message,
                duration: 5000,
                position: 'top'
            });
            toast.present();
        })
    }

    public signOut(){
        this.afAuth.auth.signOut();
    }
}