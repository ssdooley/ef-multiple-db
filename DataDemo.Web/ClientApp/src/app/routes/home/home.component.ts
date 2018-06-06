import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Item } from '../../models/item';
import { Location } from '../../models/location';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css'],
  providers: [ AppService ]
})
export class HomeComponent implements OnInit {
  item: Item;
  location: Location;

  constructor(
    public service: AppService
  ) { }

  ngOnInit() {
    this.service.getItems();
    this.service.getLocations();
    this.service.getItemLocations();

    this.service.saveState$.subscribe(
      data => this.refresh()
    );
  }

  saveItemLocation() {
    if (!this.item || !this.location) {
      return;
    }

    this.service.addItemLocation(this.item, this.location);
  }

  private refresh = () => {
    this.item = null;
    this.location = null;
    this.service.getItemLocations();
  }
}
