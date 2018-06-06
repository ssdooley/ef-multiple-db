import { Component, Input } from '@angular/core';
import { Theme } from '../../models/theme';

@Component({
  selector: 'theme-preview',
  templateUrl: 'theme-preview.component.html',
  styleUrls: ['theme-preview.component.scss']
})
export class ThemePreviewComponent {
  @Input() theme: Theme;
}
