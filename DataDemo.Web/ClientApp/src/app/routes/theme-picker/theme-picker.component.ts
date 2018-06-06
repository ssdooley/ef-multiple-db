import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'theme-picker',
  templateUrl: 'theme-picker.component.html'
})
export class ThemePickerComponent {
  constructor(
    public theme: ThemeService
  ) { }
}
