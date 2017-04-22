import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExtService } from '../service/ext-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ExtService]

})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ What: string, Code: string, icon: string }>;
  text: string;
  show: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private extService: ExtService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['shirt', 'paw', 'walk'];
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  getCodes(event, item) {
    this.extService.searchMovies().subscribe(
      data => {
        this.items = [];

        for (var i = 0; i < data.length; i++) {
          this.items.push({
            What: data[i].What,
            Code: data[i].Code,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
        }
        this.text = data[1].What;
      },
      err => {
        console.log(err);
      },
      () => console.log('Ext Request Complete')
    );

    this.show = false;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad List');
  }
}
