export class Grid implements Iterable<Array<number>> {
    grid: number[][] = [];

    constructor(public rows: number, public columns: number, initialElement = ' '.charCodeAt(0)) {
	for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
	    let row: number[] = [];
	    this.grid[rowIndex] = row;
	    for (let columnIndex = 0; columnIndex < this.columns; columnIndex++) {
		row[columnIndex] = initialElement;
	    }
	}
    }

    get(row: number, column: number): number {
	return this.grid[row][column];
    }

    set(row: number, column: number, value: number) {
	this.grid[row][column] = value;
    }

    getRow(row: number): number[] {
	return this.grid[row];
    }

    getNumberOfCells() {
	return this.rows * this.columns;
    }

    [Symbol.iterator](): Iterator<Array<number>> {
	return this.grid[Symbol.iterator]();
    }
}
