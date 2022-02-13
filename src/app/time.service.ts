import { Injectable } from '@angular/core';
import { mergeMap, Subject, take, timer } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TimeService {
    private timeGenerator$ = new Subject<void>();

    time$ = new Subject<Date>();

    constructor() {
	this.timeGenerator$
	    .pipe(
		take(1),
		mergeMap(_ => {
		    return timer(0, 1000);
		}),
	    ).subscribe(_ => {
		this.time$.next(new Date());
	    });
	this.timeGenerator$.next();
    }
}
