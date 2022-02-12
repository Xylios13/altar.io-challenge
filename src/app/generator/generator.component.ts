import { map, share, Subscription, timer } from 'rxjs';

import { Component, OnInit } from '@angular/core';

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

    time: Date;

    timeSubscription: Subscription | null;

    gridCellCount: Map<number, number>;

    generating: boolean;

    code: number;

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
	this.time = new Date();
	this.gridCellCount = new Map();
	this.generating = false;
	this.code = 0;
    }

    ngOnInit(): void {
	this.populate(true);
	this.startClock();
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

    private generateCellValue(): number {
	let min = this.cellValueRange.min;
	let max = this.cellValueRange.max + 1; // Adding one to include the max value
	let random = Math.floor(Math.random() * (max - min) + min);
	return random;
    }

    displayCellValue(value: number): string {
	return String.fromCharCode(value);
    }

    private fixCodeDigit(value: number): number {
	let firstDigit = value % 10;
	let secondDigit = value - firstDigit;
	// If the secondDigit is greater than 0, then the value is greater than 9.
	let denominator = secondDigit > 0 ? secondDigit + 1 : 0;
	return denominator > 0 ? Math.floor(value/denominator) : value;
    }

    populate(emptyGrid?: boolean) {
	this.displayedColumns = [this.rowIndexName];
	this.gridCellCount.clear();
	for (let row = 0; row < this.rows; row++) {
	    this.displayedColumns.push(row.toString());
	    this.grid[row] = [];
	    for (let column = 0; column < this.columns; column++) {
		let randomValue = emptyGrid ? ' '.charCodeAt(0) : this.generateCellValue();
		this.grid[row][column] = randomValue;
		let currentSum = this.gridCellCount.get(randomValue);
		this.gridCellCount.set(randomValue, currentSum ? currentSum + 1 : 1);
	    }
	}
	// this.grid.forEach(column => console.log(column.map(value => this.displayCellValue(value))));
	// this.gridCellCount.forEach((value: number, key: number) => {
	//     console.log(`${String.fromCharCode(key)} => ${value}`);
	// });
	let seconds = this.time.getSeconds();
	let firstDigit = seconds % 10;
	let secondDigit = (seconds - firstDigit) / 10;
	let secondCodeDigit = this.gridCellCount.get(this.grid[secondDigit][firstDigit]);
	let firstCodeDigit = this.gridCellCount.get(this.grid[firstDigit][secondDigit]);
	if (firstCodeDigit && secondCodeDigit) {
	    this.code = this.fixCodeDigit(secondCodeDigit) * 10 + this.fixCodeDigit(firstCodeDigit);
	}
    }

    getRowHeight(): string {
	return Math.floor(100 / (this.rows + 1)) + 'vh';
    }

    generateOnClick() {
	this.generating = true;
	if (this.generationSubscription) {
	    this.generationSubscription.unsubscribe();
	}
	this.generationSubscription = timer(0, this.generationTime).subscribe((_n: number) => this.populate());
    }
}
