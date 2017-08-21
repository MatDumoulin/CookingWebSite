import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppComponent } from './app.component'; --> Import our modules instead.

@NgModule({
  declarations: [
    //AppComponent    --> Use it here.
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [/*AppComponent*/] // --> Same here.
})
export class AppModule { }
