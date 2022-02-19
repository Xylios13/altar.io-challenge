import { Component, OnInit } from '@angular/core';
import { Grid } from '../grid';

import { EMPTY_CODE, GridService } from '../grid.service';

@Component({
    selector: 'app-live-status',
    templateUrl: './live-status.component.html',
    styleUrls: ['./live-status.component.scss']
})
export class LiveStatusComponent implements OnInit {
    code = EMPTY_CODE;

    constructor(private gridService: GridService) {
	this.gridService.grid$.subscribe({
	    next: (grid: Grid) => { this.code = grid.getCode() }
	});
    }

    generating(): boolean {
	return this.code !== EMPTY_CODE;
    }


    ngOnInit(): void {
	// TODO: This should be improved. It is being set to ensure the correct initial state...
	this.code = this.gridService.getCode();
    }

}
