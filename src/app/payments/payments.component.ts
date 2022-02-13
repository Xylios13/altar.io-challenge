import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';

import { Grid } from '../grid';
import { GridService } from '../grid.service';


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

    grid: Grid = new Grid(0, 0);

    payments: Payment[] = PAYMENT_DATA;

    addPaymentFormGroup: FormGroup = new FormGroup({});

    nameFormControl: FormControl = new FormControl();

    amountFormControl: FormControl = new FormControl();

    @ViewChild(MatTable) table: MatTable<Payment> | undefined;

    constructor(private gridService: GridService) { }

    ngOnInit(): void {
	this.gridService.grid$.subscribe({
	    next: (grid: Grid) => { this.grid = grid; }
	})
	this.addPaymentFormGroup.addControl('name', this.nameFormControl);
	this.addPaymentFormGroup.addControl('amount', this.amountFormControl);
    }

    getCode(grid: Grid): string {
	return grid.getCode();
    }

    getGrid(): Grid {
	return this.grid;
    }

    onFormSubmit() {
	console.log(this.addPaymentFormGroup.get('name'));
	if (this.nameFormControl.valid && this.amountFormControl.valid) {
	    let grid = this.getGrid();
	    this.payments.push({
		name: this.nameFormControl.value,
		amount: this.amountFormControl.value,
		code: this.getCode(grid),
		grid: grid
	    });
	    this.table?.renderRows();
	}
    }

}
