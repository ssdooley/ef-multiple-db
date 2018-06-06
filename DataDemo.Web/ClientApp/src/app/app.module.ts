import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { MaterialModule } from './material.module';
import { ServicesModule } from './services.module';

import { ThemePreviewComponent } from './components/theme/theme-preview.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { ThemePickerComponent } from './routes/theme-picker/theme-picker.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'theme-picker', component: ThemePickerComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ThemePreviewComponent,
    AppComponent,
    HomeComponent,
    ThemePickerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ServicesModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
