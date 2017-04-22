import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OneSignal } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewsPage } from '../pages/news/news';
import { SharePage } from '../pages/share/share';
import { AboutPage } from '../pages/about/about';

import { AppSecretsProvider } from '../pages/service/app-secrets-service';

@Component({
  templateUrl: 'app.html',
    providers: [AppSecretsProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public appSecrets: AppSecretsProvider) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'News', component: NewsPage },
      { title: 'List', component: ListPage },
      { title: 'Share', component: SharePage },
      { title: 'About', component: AboutPage },
    ];


    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

OneSignal.startInit(this.appSecrets.appId, this.appSecrets.googleProjectNumber);
OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

OneSignal.handleNotificationReceived().subscribe((notification) => {
  var title = notification.payload.title;
 var body = notification.payload.body;
 this.storage.ready().then(() => {
   console.log("notification received");

       // set a key/value
       this.storage.set(title, body);
       
   console.log("notification should be saved to db");

  });
 
});
OneSignal.handleNotificationOpened().subscribe(() => {
  // do something when a notification is opened
});

OneSignal.endInit();


      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
