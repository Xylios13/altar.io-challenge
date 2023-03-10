import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';
import { EMPTY_CODE, Grid } from './grid';

describe('GridService', () => {
  let service: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#getEmptyCode should return ${EMPTY_CODE}`, () => {
    expect(service.getEmptyCode()).toBe(EMPTY_CODE);
  });

  it('#getGrid should return instance of Grid', () => {
    expect(service.getGrid()).toBeInstanceOf(Grid);
  });

  // Using the service to test grid.ts
  describe('Grid', () => {
    let grid: Grid;
    let time: Date = new Date('2022-02-19T17:00:45');
    beforeEach(() => {
      grid = new Grid(10, 10);
    });
    it('#getDigits should return { tens: 4, ones: 5 }', () => {
      let digits = grid.getDigits(time.getSeconds());
      expect(digits).toEqual({ ones: 5, tens: 4 });
    });
    it('#calculateCode should return 32', () => {
      // Testing [4, 5] = m and [5, 4] = k
      // number of m = 3
      // number of k = 2
      // code 32
      grid.grid =
        [
          //0    1    2    3    4    5    6    7    8    9
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'o', 'a'], // 0
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'o', 'a'], // 1
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'o', 'a'], // 2
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'a'], // 3
          ['a', 'a', 'b', 'c', 'd', 'm', 't', 'i', 'o', 'a'], // 4
          ['a', 'a', 'b', 'c', 'k', 'e', 't', 'i', 'o', 'a'], // 5
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'o', 'a'], // 6
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'o', 'a'], // 7
          ['a', 'a', 'k', 'c', 'd', 'e', 't', 'i', 'm', 'a'], // 8
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'o', 'a']  // 9
        ].map(row => row.map(character => character.charCodeAt(0)));
      // This shouldn't be done. The counting of characters
      // should be tested. The counting of characters is done
      // while populating the grid, to avoid traversing the grid
      // twice.
      grid.gridCellCount.set('m'.charCodeAt(0), 3);
      grid.gridCellCount.set('k'.charCodeAt(0), 2);
      grid.calculateCode(time);
      expect(grid.getCode()).toBe('32');
    });
    it('#calculateCode should return 62', () => {
      // Testing [4, 5] = m and [5, 4] = k
      // number of m = 20
      // number of k = 2
      // code 62
      grid.grid =
        [
          //0    1    2    3    4    5    6    7    8    9
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'm'], // 0
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'm'], // 1
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'm'], // 2
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'm'], // 3
          ['a', 'a', 'b', 'c', 'd', 'm', 't', 'i', 'm', 'm'], // 4
          ['a', 'a', 'b', 'c', 'k', 'e', 't', 'i', 'm', 'm'], // 5
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'm'], // 6
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'm'], // 7
          ['a', 'a', 'k', 'c', 'd', 'e', 't', 'i', 'm', 'm'], // 8
          ['a', 'a', 'b', 'c', 'd', 'e', 't', 'i', 'm', 'm']  // 9
        ].map(row => row.map(character => character.charCodeAt(0)));
      grid.gridCellCount.set('m'.charCodeAt(0), 20);
      grid.gridCellCount.set('k'.charCodeAt(0), 2);
      grid.calculateCode(time);
      expect(grid.getCode()).toBe('62');
    })
  });
});
