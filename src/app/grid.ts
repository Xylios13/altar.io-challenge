export const EMPTY_CODE = '';

interface Digits {
  ones: number;

  tens: number;
}

export class Grid implements Iterable<Array<number>> {
  grid: number[][] = [];

  gridCellCount: Map<number, number> = new Map();

  // Minimum and maximum possible values for the cell (both limits are included).
  private cellValueRange = { min: 'a'.charCodeAt(0), max: 'z'.charCodeAt(0) };

  code = EMPTY_CODE;

  constructor(public rows: number, public columns: number, initialElement = ' '.charCodeAt(0)) {
    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      let row: number[] = [];
      this.grid[rowIndex] = row;
      for (let columnIndex = 0; columnIndex < this.columns; columnIndex++) {
        row[columnIndex] = initialElement;
      }
    }
  }

  [Symbol.iterator](): Iterator<Array<number>> {
    return this.grid[Symbol.iterator]();
  }

  getCell(row: number, column: number): number {
    return this.grid[row][column];
  }

  setCell(row: number, column: number, value: number) {
    this.grid[row][column] = value;
  }

  getRow(row: number): number[] {
    return this.grid[row];
  }

  getCode(): string {
    return this.code;
  }

  getNumberOfCells() {
    return this.rows * this.columns;
  }

  populate(time: Date, weightedCharacter = '') {
    this.gridCellCount.clear();
    weightedCharacter = weightedCharacter.toLowerCase();
    let weightedCharacterCode = weightedCharacter.charCodeAt(0);
    let emptyCells = this.rows * this.columns;
    let emptySpecialCells = emptyCells * 0.2;
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let randomValue = ' '.charCodeAt(0);
        let specialWeight = emptySpecialCells / emptyCells;
        let specialRandom = Math.random();
        if (weightedCharacter !== '' && specialRandom - specialWeight <= 0) {
          randomValue = weightedCharacterCode;
        } else {
          randomValue = this.generateCell();
          while (emptySpecialCells === 0 && randomValue === weightedCharacterCode) {
            randomValue = this.generateCell();
          }
        }
        if (randomValue === weightedCharacterCode) {
          emptySpecialCells -= 1;
        }
        emptyCells -= 1;
        this.setCell(row, column, randomValue);
        let currentSum = this.gridCellCount.get(randomValue);
        this.gridCellCount.set(randomValue, currentSum ? currentSum + 1 : 1);
      }
    }
    this.calculateCode(time);
  }

  calculateCode(time: Date) {
    let digits = this.getDigits(time.getSeconds());
    let tensCodeDigit = this.gridCellCount.get(this.getCell(digits.tens, digits.ones));
    let onesCodeDigit = this.gridCellCount.get(this.getCell(digits.ones, digits.tens));
    if (onesCodeDigit && tensCodeDigit) {
      this.code = this.correctCodeDigit(tensCodeDigit).toString() + this.correctCodeDigit(onesCodeDigit).toString();
    }
  }

  generateCell(weightedCharacter?: string, weight = 0.2): number {
    let min = this.cellValueRange.min;
    let max = this.cellValueRange.max + 1; // Adding one to include the max value
    let totalCharacters = max - min;
    // Note: This isn't being used. I didn't delete this so we
    // could discuss the possibility of each cell having a 20%
    // weighted character instead of having the 20% weighted
    // character on the whole grid.
    if (weightedCharacter && weightedCharacter !== '') {
      let weightedIndex = weightedCharacter.charCodeAt(0) - min;
      let defaultWeight = (1 - weight) / (totalCharacters - 1);
      let random = Math.random();
      for (let i = 0; i < totalCharacters; i++) {
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

  getDigits(value: number): Digits {
    let onesDigit = value % 10;
    let tensDigit = (value - onesDigit) / 10;
    return {
      ones: onesDigit,
      tens: tensDigit
    };
  }

  private correctCodeDigit(value: number): number {
    let digits = this.getDigits(value);
    // If the secondDigit is greater than 0, then the value is greater than 9.
    let denominator = digits.tens > 0 ? digits.tens + 1 : 0;
    return denominator > 0 ? Math.floor(value / denominator) : value;
  }
}
