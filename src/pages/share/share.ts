import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the Share page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
  providers: [SocialSharing]
})
export class SharePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public socialSharing: SocialSharing) {

  }

  shareAnywhere() {

    // Share via email
    this.socialSharing.share('DanceApp super aplikacja', 'assets/img/dancelinesteamset.png', 'http://nhl.com').then(() => {
      console.log('Shared.');
    }).catch(() => {
      console.log('Did not share.');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Share');
  }
}
