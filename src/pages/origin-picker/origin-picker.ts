import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DiscoveryProvider } from '../../providers';

import { TripListPage } from '../../pages';

import { Location } from '../../models';

/**
 * Generated class for the OriginPickerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-origin-picker',
  templateUrl: 'origin-picker.html',
})
export class OriginPickerPage {
  suggestions: any;
  origin: any;
  isOriginSet: Boolean = false;
  criteria: any = {
    origin: {}
  };
  destination: Location;
  selectedOrigin = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public discovery: DiscoveryProvider) {
    this.criteria.budget = {
      lower: 100000,
      upper: 350000
    };

    this.destination = this.navParams.get('destination');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OriginPickerPage');
  }

  fetchSuggestions(query) {
    console.info('Fetching Suggestions', query);
    this.discovery.fetchSuggestions(query)
      .then(suggestions => {
        this.suggestions = suggestions.predictions;
        console.info('Loaded suggestions', this.suggestions);
      });
  }

  setOrigin(origin) {
    this.selectedOrigin = origin.city + '(' + origin.code + ')';
    this.criteria.origin = origin;
    this.isOriginSet = true;
    this.suggestions = [];
  }

  discoverTrips() {
    this.navCtrl.push(TripListPage, {
      criteria: this.criteria
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
