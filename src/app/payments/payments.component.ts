import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';

import { Grid } from '../grid';
import { GridService } from '../grid.service';
import { PaymentsService } from '../payments.service';


export interface Payment {
    name: string;
    amount: number;
    code: string;
    grid: Grid;
}

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'amount', 'code', 'grid'];

    grid: Grid = new Grid(0, 0);

    addPaymentFormGroup: FormGroup = new FormGroup({});

    nameFormControl: FormControl = new FormControl();

    amountFormControl: FormControl = new FormControl();

    addButtonFormControl: FormControl = new FormControl();

    @ViewChild(MatTable) table: MatTable<Payment> | undefined;

    constructor(private gridService: GridService, private paymentsService: PaymentsService) {
	this.gridService.grid$.subscribe({
	    next: (grid: Grid) => {
		this.grid = grid;
	    }
	});
    }

    ngOnInit() {
	// TODO: This should be improved. It is being set to ensure the correct initial state...
	this.grid = this.gridService.getGrid();
	this.addPaymentFormGroup.addControl('name', this.nameFormControl);
	this.addPaymentFormGroup.addControl('amount', this.amountFormControl);
	this.addPaymentFormGroup.addControl('add', this.addButtonFormControl);
	if (this.grid.getCode() === this.gridService.getEmptyCode()) {
	    this.addPaymentFormGroup.disable();
	} else {
	    this.addPaymentFormGroup.enable();
	}

    }

    getCode(grid: Grid): string {
	return grid.getCode();
    }

    getPayments(): Payment[] {
	return this.paymentsService.getPayments();
    }

    onFormSubmit() {
	console.log(this.addPaymentFormGroup.get('name'));
	if (this.nameFormControl.valid && this.amountFormControl.valid) {
	    let grid = this.grid;
	    this.paymentsService.add({
		name: this.nameFormControl.value,
		amount: this.amountFormControl.value,
		code: this.getCode(grid),
		grid: grid
	    });
	    this.table?.renderRows();
	}
    }

}
