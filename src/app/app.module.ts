import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';
import { AppRoutingModule } from './app-routing.module';
import { LiveStatusComponent } from './live-status/live-status.component';


@NgModule({
    declarations: [
	AppComponent,
	GeneratorComponent,
	PaymentsComponent,
	LiveStatusComponent
    ],
    imports: [
	AppRoutingModule,
	BrowserAnimationsModule,
	BrowserModule,
	FormsModule,
	MatButtonModule,
	MatCardModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatTableModule,
	ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
