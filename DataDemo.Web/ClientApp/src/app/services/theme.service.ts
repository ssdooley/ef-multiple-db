import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme';

@Injectable()
export class ThemeService {
  private darkThemes = new BehaviorSubject<Theme[]>([
    { name: 'dark-green', display: 'Green' },
    { name: 'dark-blue', display: 'Blue' },
    { name: 'dark-red', display: 'Red' },
    { name: 'dark-indigo', display: 'Indigo' },
    { name: 'dark-orange', display: 'Orange' },
    { name: 'dark-purple', display: 'Purple' },
    { name: 'dark-amber', display: 'Amber' },
    { name: 'dark-crimson', display: 'Crimson' },
    { name: 'dark-teal', display: 'Teal' }
  ]);

  private lightThemes = new BehaviorSubject<Theme[]>([
    { name: 'light-green', display: 'Green' },
    { name: 'light-blue', display: 'Blue' },
    { name: 'light-red', display: 'Red' },
    { name: 'light-indigo', display: 'Indigo' },
    { name: 'light-orange', display: 'Orange' },
    { name: 'light-purple', display: 'Purple' },
    { name: 'light-amber', display: 'Amber' },
    { name: 'light-crimson', display: 'Crimson' },
    { name: 'light-teal', display: 'Teal' }
  ]);

  private themeSubject = new BehaviorSubject<Theme>(this.darkThemes.value[0]);

  theme$ = this.themeSubject.asObservable();
  darkThemes$ = this.darkThemes.asObservable();
  lightThemes$ = this.lightThemes.asObservable();

  constructor(
    private overlay: OverlayContainer
  ) {
    this.setOverlayContainerTheme(this.themeSubject.value.name);
  }

  setTheme = (theme: Theme) => {
    this.setOverlayContainerTheme(theme.name, this.themeSubject.value.name);
    this.themeSubject.next(theme);
  }

  setOverlayContainerTheme = (newTheme: string, oldTheme?: string) => {
    if (oldTheme) {
      this.overlay.getContainerElement().classList.remove(oldTheme);
    }
    this.overlay.getContainerElement().classList.add(newTheme);
  }
}
