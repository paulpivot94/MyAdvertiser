import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { Response } from 'selenium-webdriver/http';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    providerFb: firebase.auth.FacebookAuthProvider;
    getPlateform: any;
    response: any;
    connected = false;
    userId: string;

    constructor(
        public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private fb: Facebook,
        public platform: Platform
    ) {
        this.providerFb = new firebase.auth.FacebookAuthProvider();
        this.fb = fb;
        alert(fb);
    }

    /** fonction de connection via facebook */
    facebookLogin() {
        if (this.platform.is('cordova')) {
            this.getPlateform = 'PLateforme cordova';
            //alert('test');
            this.facebookCordova();
        } else {
            this.getPlateform = 'PLateforme Web';
            this.facebookWeb();
        }
    }

    /** fonction de connexion via cordova a facebook */
    facebookCordova() {
        this.fb.login(['email']).then( (response) => {
            const facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);
            firebase.auth().signInWithCredential(facebookCredential)
            .then((success) => {
                alert('Info Facebook: ' + JSON.stringify(success));
                this.afDB.object('Users/' + success.user.uid).set({
                  displayName: success.user.displayName,
                  photoURL: success.user.photoURL
                });
            }).catch((error) => {
                alert('Erreur: ' + JSON.stringify(error));
            });
        }).catch((error) => { alert(error); });
    }

    /** fonction de connexion via web platform a facebook, juste pour lle developpement */
    facebookWeb() {
        this.afAuth.auth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((success) => {
                console.log('Info Facebook: ' + JSON.stringify(success));
                this.afDB.object('Users/' + success.user.uid).set({
                    displayName: success.user.displayName,
                    photoURL: success.user.photoURL
                    });
            }).catch((error) => {
                console.log('Erreur: ' + JSON.stringify(error));
            });
    }

}
