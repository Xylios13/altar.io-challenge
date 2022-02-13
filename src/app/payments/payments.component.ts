import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';

import { Grid } from '../grid';

export interface Payment {
    name: string;
    amount: number;
    code: string;
    grid: Grid;
}

const PAYMENT_DATA: Payment[] = [
    {name: 'Hydrogen', amount: 1.0079, code: '89', grid: new Grid(10, 10)},
    {name: 'Switch', amount: 300, code: '77', grid: new Grid(10, 10)},
    {name: 'PS5', amount: 500, code: '15', grid: new Grid(10, 10)},
];

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'amount', 'code', 'grid'];

    payments: Payment[] = PAYMENT_DATA;

    addPaymentFormGroup: FormGroup = new FormGroup({});

    nameFormControl: FormControl = new FormControl();

    amountFormControl: FormControl = new FormControl();

    @ViewChild(MatTable) table: MatTable<Payment> | undefined;

    constructor() { }

    ngOnInit(): void {
	this.addPaymentFormGroup.addControl('name', this.nameFormControl);
	this.addPaymentFormGroup.addControl('amount', this.amountFormControl);
    }

    getCode(): string {
	// TODO
	return '0';
    }

    getGrid(): Grid {
	// TODO
	return new Grid(10, 10)
    }

    onFormSubmit() {
	console.log(this.addPaymentFormGroup.get('name'));
	if (this.nameFormControl.valid && this.amountFormControl.valid) {
	    this.payments.push({
		name: this.nameFormControl.value,
		amount: this.amountFormControl.value,
		code: this.getCode(),
		grid: this.getGrid()
	    });
	    this.table?.renderRows();
	}
    }

}
