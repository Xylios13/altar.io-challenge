import { first, interval, Subject, Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Grid } from '../grid';
import { GridService } from '../grid.service';
import { TimeService } from '../time.service';


/** Error when invalid control is dirty or touched. */
export class WeightedCharacterMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, _form: FormGroupDirective | NgForm | null): boolean {
	// Double negative to ensure boolean return
	return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
    grid: Grid = new Grid(0, 0);

    displayedColumns: string[] = [];

    rowIndexName = 'row-index';

    time: Date = new Date();

    timeSubscription: Subscription | null = null;

    gridCellCount: Map<number, number> = new Map();

    generating = false;

    code = '';

    weightedCharacterFormControl = new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]'))]);

    weightedCharacterMatcher = new WeightedCharacterMatcher();

    weights: number[] = [];

    generation$ = new Subject<void>();

    constructor(private gridService: GridService, private timeService: TimeService) {
    }

    ngOnInit(): void {
	this.timeService.time$.subscribe({
	    next: (time: Date) => { this.time = time }
	});
	this.gridService.grid$.subscribe({
	    next: (grid: Grid) => { this.grid = grid, this.code = grid.getCode() }
	});
	this.weightedCharacterFormControl.setValue('');
    }

    getColumns(): number {
	return this.grid.columns;
    }

    displayCellValue(value: number): string {
	return String.fromCharCode(value);
    }

    getRowHeight(): string {
	return Math.floor(80 / (this.grid.rows + 1)) - 1 + 'vh';
    }

    weightedCharacterOnInput() {
	if (!this.weightedCharacterFormControl.hasError('pattern') && this.weightedCharacterFormControl.enabled) {
	    this.weightedCharacterFormControl.disable();
	    this.gridService.setWeightedCharacter(this.weightedCharacterFormControl.value);
	    interval(4000).pipe(first()).subscribe((_n: number) => this.weightedCharacterFormControl.enable());
	}
    }

    generationOnClick() {
	this.generating = true;
	this.gridService.startGrid();
    }
}
