import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LightComponent } from './Components/light/light.component';
import { DarkComponent } from './Components/dark/dark.component';
import { SwitchComponent } from './Components/switch/switch.component';

@NgModule({
  declarations: [
    AppComponent,
    LightComponent,
    DarkComponent,
    SwitchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
