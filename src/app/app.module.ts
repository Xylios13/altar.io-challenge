import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
    declarations: [
	AppComponent,
	GeneratorComponent,
	PaymentsComponent
    ],
    imports: [
	BrowserModule,
	FormsModule,
	AppRoutingModule,
	MatGridListModule,
	MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
