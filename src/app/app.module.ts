import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
	AppRoutingModule,
	BrowserAnimationsModule,
	BrowserModule,
	FormsModule,
	MatButtonModule,
	MatGridListModule,
	MatInputModule,
	MatTableModule,
	ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
