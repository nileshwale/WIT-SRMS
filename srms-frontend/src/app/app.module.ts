import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TokenInterceptor } from './shared/token.interceptor';



// (Optional) If you already created TokenInterceptor
// import { TokenInterceptor } from './shared/token.interceptor';

@NgModule({
  declarations: [
    AppComponent // 👈 Main component declaration
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } // Optional
    
  ],
  bootstrap: [AppComponent] // 👈 Required to bootstrap your app
})
export class AppModule {}
