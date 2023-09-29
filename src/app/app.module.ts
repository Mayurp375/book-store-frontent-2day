import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule for Angular Material animations
import { MatButtonModule } from '@angular/material/button'; // Import the MatButtonModule for the 'mat-raised-button'
import { MatDialogModule } from '@angular/material/dialog'; // Import the MatDialogModule for the MatDialog

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterComponent } from './register/register.component';

import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { FetchPageComponent } from './fetch-page/fetch-page.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    RegisterComponent,
    FetchPageComponent,
    CartItemComponent,
    AdminComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, FormsModule, ReactiveFormsModule, MatDialogModule,MatInputModule,MatRadioModule
    ,HttpClientModule,MatGridListModule,MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
