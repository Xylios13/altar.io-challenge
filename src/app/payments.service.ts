import { Injectable } from '@angular/core';
import { Grid } from './grid';

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

    add(payment: Payment) {
	this.payments.push(payment);
    }

    getPayments(): Payment[] {
	return this.payments.slice();
    }
}
