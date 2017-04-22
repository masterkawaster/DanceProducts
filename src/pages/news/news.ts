import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({

  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  text: any;
  items: Array<{ Title: string, Body: string }>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.items = new Array();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad News');

    console.log("Wczytywanie z bazy");
    this.storage.forEach((value, key, number) => {
      console.log("key:" + key + " val:" + value);
      this.items.push({ Title: key, Body: value });
      console.log("ilosc elementów w items: " + this.items.length)
      console.log("pierwszy element w items: " + "title:" + this.items[0].Title + " body:" + this.items[0].Body);
      this.text = this.items[0];
    });
  }

}   