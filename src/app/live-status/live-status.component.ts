import { Component, OnInit } from '@angular/core';
import { Grid } from '../grid';

import { GridService } from '../grid.service';

@Component({
  selector: 'app-live-status',
  templateUrl: './live-status.component.html',
  styleUrls: ['./live-status.component.scss']
})
export class LiveStatusComponent implements OnInit {
  code: string;

  constructor(private gridService: GridService) {
    this.code = this.gridService.getEmptyCode();
    this.gridService.grid$.subscribe({
      next: (grid: Grid) => { this.code = grid.getCode() }
    });
  }

  generating(): boolean {
    return this.code !== this.gridService.getEmptyCode();
  }


  ngOnInit(): void {
    // TODO: This should be improved. It is being set to ensure the correct initial state...
    this.code = this.gridService.getCode();
  }

}
