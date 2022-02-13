import { first, interval, map, Subscription, timer } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

interface Digits {
    first: number;

    second: number;
}

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
    rows: number;

    columns: number;

    generationTime: number;

    grid: number[][];

    // Minimum and maximum possible values for the cell (both limits are included).
    private cellValueRange = { min: 'a'.charCodeAt(0), max: 'z'.charCodeAt(0) };

    displayedColumns: string[];

    rowIndexName = 'row-index';

    generationSubscription: Subscription | null;

    time: Date = new Date();

    timeSubscription: Subscription | null;

    gridCellCount: Map<number, number> = new Map();

    generating = false;

    code = 0;

    weightedCharacterFormControl = new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]'))]);

    weightedCharacterMatcher = new WeightedCharacterMatcher();

    weights: number[] = [];

    // generationEvent: Observable<boolean>;

    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    // dataSource = ELEMENT_DATA;

    constructor() {
	this.rows = 10;
	this.columns = 10;
	this.generationTime = 2000;
	this.grid = [];
	this.displayedColumns = [];
	this.generationSubscription = null;
	this.timeSubscription = null;
    }

    ngOnInit(): void {
	this.weightedCharacterFormControl
	this.populate(true);
	this.startClock();
	this.weightedCharacterFormControl.setValue('');
    }

    startClock() {
	this.timeSubscription = timer(0, 1000)
	    .pipe(
		map(() => new Date()),
		// share()
	    )
	    .subscribe(time => {
		this.time = time;
	    });
    }

    private generateCellValue(weightedCharacter?: string, weight = 0.2): number {
	let min = this.cellValueRange.min;
	let max = this.cellValueRange.max + 1; // Adding one to include the max value
	let totalCharacters = max - min;
	if (weightedCharacter && weightedCharacter !== '') {
	    let weightedIndex = weightedCharacter.charCodeAt(0) - min;
	    let defaultWeight = (1 - weight) / (totalCharacters - 1);

	    // this.weights[i] = i === weightedIndex ? weight : defaultWeight;

	    // let weightedSum = this.nthTriangleNumber(totalCharacters);
	    let random = Math.random();
	    for (let i = 0; i < totalCharacters; i ++) {
		let currentWeight = i === weightedIndex ? weight : defaultWeight;
		random = random - currentWeight;
		if (random < 0) {
		    return i + min;
		}
	    }
	    console.error('Weight algorithm failed.');
	    return min;
	} else {
	    return Math.floor(Math.random() * totalCharacters + min);
	}

    }

    displayCellValue(value: number): string {
	return String.fromCharCode(value);
    }

    getDigits(value: number): Digits {
	let firstDigit = value % 10;
	let secondDigit = (value - firstDigit) / 10;
	return {
	    first: firstDigit,
	    second: secondDigit
	};
    }

    private fixCodeDigit(value: number): number {
	let digits = this.getDigits(value);
	// If the secondDigit is greater than 0, then the value is greater than 9.
	let denominator = digits.second > 0 ? digits.second + 1 : 0;
	return denominator > 0 ? Math.floor(value/denominator) : value;
    }

    nthTriangleNumber(value: number) {
	let sum = 0;
	for (let n = value; n > 0; n--) {
	    sum += n;
	}
	return sum;
    }

    populate(emptyGrid?: boolean) {
	this.displayedColumns = [this.rowIndexName];
	this.gridCellCount.clear();
	for (let row = 0; row < this.rows; row++) {
	    this.displayedColumns.push(row.toString());
	    this.grid[row] = [];
	    for (let column = 0; column < this.columns; column++) {
		let randomValue = emptyGrid ? ' '.charCodeAt(0) : this.generateCellValue(this.weightedCharacterFormControl.value.toLowerCase());
		this.grid[row][column] = randomValue;
		let currentSum = this.gridCellCount.get(randomValue);
		this.gridCellCount.set(randomValue, currentSum ? currentSum + 1 : 1);
	    }
	}
	this.grid.forEach(column => console.log(column.map(value => this.displayCellValue(value))));
	this.gridCellCount.forEach((value: number, key: number) => {
	    console.log(`${String.fromCharCode(key)} => ${value}`);
	});
	let digits = this.getDigits(this.time.getSeconds());
	let secondCodeDigit = this.gridCellCount.get(this.grid[digits.second][digits.first]);
	let firstCodeDigit = this.gridCellCount.get(this.grid[digits.first][digits.second]);
	if (firstCodeDigit && secondCodeDigit) {
	    this.code = this.fixCodeDigit(secondCodeDigit) * 10 + this.fixCodeDigit(firstCodeDigit);
	}
    }

    getRowHeight(): string {
	return Math.floor(100 / (this.rows + 1)) - 1 + 'vh';
    }

    generateOnClick() {
	this.generating = true;
	if (this.generationSubscription) {
	    this.generationSubscription.unsubscribe();
	}
	this.generationSubscription = timer(0, this.generationTime).subscribe((_n: number) => this.populate());
    }

    weightedCharacterOnInput() {
	if (!this.weightedCharacterFormControl.hasError('pattern') && this.weightedCharacterFormControl.enabled) {
	    this.weightedCharacterFormControl.disable();
	    interval(4000).pipe(first()).subscribe((_n: number) => this.weightedCharacterFormControl.enable());
	}
    }
}
