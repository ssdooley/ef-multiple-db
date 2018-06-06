import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from './snacker.service';
import { Item } from '../models/item';
import { Location } from '../models/location';
import { ItemLocation } from '../models/item-location';
import { ItemLocationModel } from '../models/item-location-model';
import { ItemLocationPair } from '../models/item-location-pair';
import { LocationItemModel } from '../models/location-item-model';

@Injectable()
export class AppService {
  private items = new BehaviorSubject<Item[]>(null);
  private locations = new BehaviorSubject<Location[]>(null);
  private itemLocations = new BehaviorSubject<ItemLocationModel[]>(null);
  private locationItems = new BehaviorSubject<LocationItemModel[]>(null);
  private saveState = new BehaviorSubject<boolean>(false);

  items$ = this.items.asObservable();
  locations$ = this.locations.asObservable();
  itemLocations$ = this.itemLocations.asObservable();
  locationItems$ = this.locationItems.asObservable();
  saveState$ = this.saveState.asObservable();

  loadingItems = false;
  loadingLocations = false;
  loadingItemLocations = false;
  loadingLocationItems = false;

  constructor(
    private snacker: SnackerService,
    private http: HttpClient
  ) { }

  getItems = () => {
    this.loadingItems = true;
    this.http.get<Item[]>('/api/app/getItems')
      .subscribe(
        data => {
          this.items.next(data);
          this.loadingItems = false;
        },
        err => {
          this.snacker.sendErrorMessage(err);
          this.loadingItems = false;
        });
  }

  getLocations = () => {
    this.loadingLocations = true;
    this.http.get<Location[]>('/api/app/getLocations')
      .subscribe(
        data => {
          this.locations.next(data);
          this.loadingLocations = false;
        },
        err => {
          this.snacker.sendErrorMessage(err);
          this.loadingLocations = false;
        });
  }

  getItemLocations = () => {
    this.loadingItemLocations = true;
    this.http.get<ItemLocationModel[]>('/api/app/getItemLocations')
      .subscribe(
        data => {
          this.itemLocations.next(data);
          this.loadingItemLocations = false;
        },
        err => {
          this.snacker.sendErrorMessage(err);
          this.loadingItemLocations = false;
        });
  }

  getLocationItems = () => {
    this.loadingLocationItems = true;
    this.http.get<LocationItemModel[]>('/api/app/getLocationItems')
      .subscribe(
        data => {
          this.locationItems.next(data);
          this.loadingLocationItems = false;
        },
        err => {
          this.snacker.sendErrorMessage(err);
          this.loadingLocationItems = false;
        });
  }

  addItemLocation = (item: Item, location: Location) => {
    const il = this.createPair(item, location);

    this.http.post('/api/app/addItemLocation', il)
      .subscribe(
        () => {
          this.snacker.sendSuccessMessage(`${item.name} linked to ${location.name}`);
          this.popSave();
        },
        err => this.snacker.sendErrorMessage(err)
      );
  }

  updateItemLocation = (item: Item, location: Location, locationId: number) => {
    const il = this.createPair(item, location);

    this.http.post(`/api/app/updateItemLocation/${locationId}`, il)
      .subscribe(
        () => {
          this.snacker.sendSuccessMessage(`${item.name} updated to ${location.name}`);
          this.popSave();
        },
        err => this.snacker.sendErrorMessage(err)
      );
  }

  updateLocationItem = (item: Item, location: Location, itemId: number) => {
    const il = this.createPair(item, location);

    this.http.post(`/api/app/updateLocationItem/${itemId}`, il)
      .subscribe(
        () => {
          this.snacker.sendSuccessMessage(`${location.name} updated to ${item.name}`);
          this.popSave();
        },
        err => this.snacker.sendErrorMessage(err)
      );
  }

  removeItemLocation = (il: ItemLocation) => {
    this.http.post('/api/app/removeItemLocation', il)
      .subscribe(
        () => {
          this.snacker.sendSuccessMessage('Item Location successfully removed');
          this.popSave();
        },
        err => this.snacker.sendErrorMessage(err)
      );
  }

  private createPair = (item: Item, location: Location): ItemLocationPair => {
    const il = new ItemLocationPair();
    il.item = item;
    il.location = location;
    return il;
  }

  private popSave = () => {
    this.saveState.next(true);
    this.saveState.next(false);
  }
}
