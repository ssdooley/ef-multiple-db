import { Component, Input } from '@angular/core';
import { ItemLocationModel } from '../../models/item-location-model';

@Component({
  selector: 'item-location-card',
  templateUrl: 'item-location-card.component.html'
})
export class ItemLocationCardComponent {
  @Input() item: ItemLocationModel;
}
