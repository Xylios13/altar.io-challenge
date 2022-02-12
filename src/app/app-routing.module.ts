import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
    { path: '', redirectTo: '/generator', pathMatch: 'full' },
    { path: 'generator', component: GeneratorComponent },
    { path: 'payments', component: PaymentsComponent }
]

@NgModule({
    imports: [
	RouterModule.forRoot(routes)
    ],
    exports: [
	RouterModule
    ]
})
export class AppRoutingModule { }
