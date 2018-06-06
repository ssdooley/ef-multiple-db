import { Component, Input } from '@angular/core';
import { ItemLocationModel } from '../../models/item-location-model';

@Component({
  selector: 'item-locations',
  templateUrl: 'item-locations.component.html'
})
export class ItemLocationsComponent {
  @Input() items: ItemLocationModel[];
}
