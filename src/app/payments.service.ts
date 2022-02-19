import { Injectable } from '@angular/core';
import { Grid } from './grid';
import { Observable, of } from 'rxjs';

export interface Payment {
    name: string;
    amount: number;
    code: string;
    grid: Grid;
}

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {
    payments: Payment[] = [];

    constructor() { }

    addPayment(payment: Payment): Observable<boolean> {
	this.payments.push(payment);
	return of(true);
    }

    getPayments(): Observable<Payment[]> {
	const payments = of(this.payments);
	return payments;
    }
}
