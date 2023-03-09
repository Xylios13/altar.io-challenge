import { Injectable } from '@angular/core';
import { mergeMap, Subject, take, timer } from 'rxjs';

import { EMPTY_CODE, Grid } from './grid';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  time: Date = new Date();

  rows = 10;

  columns = 10;

  codeGenerationInterval = 2000;

  grid: Grid = new Grid(this.rows, this.columns);

  private gridGenerator$ = new Subject<void>();

  grid$ = new Subject<Grid>();

  generation$ = new Subject<void>();

  weightedCharacter = '';

  constructor(private timeService: TimeService) {
    this.timeService.time$.subscribe({
      next: (time: Date) => { this.time = time }
    });
    this.gridGenerator$
      .pipe(
        take(1),
        mergeMap(_ => {
          return timer(0, this.codeGenerationInterval);
        })
      ).subscribe(_ => {
        this.populateGrid(this.weightedCharacter);
        this.grid$.next(this.grid);
      });
  }

  getEmptyCode(): string {
    return EMPTY_CODE;
  }

  getCode(): string {
    return this.grid.code;
  }

  getGrid(): Grid {
    return this.grid;
  }

  setWeightedCharacter(weightedCharacter: string) {
    this.weightedCharacter = weightedCharacter;
  }

  populateGrid(weightedCharacter: string) {
    this.grid.populate(this.time, weightedCharacter);
  }

  startGrid() {
    this.gridGenerator$.next();
  }
}
