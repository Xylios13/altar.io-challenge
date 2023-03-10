# Altar.Io

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.
It also uses Angular Material version 13.2.2.

## Running the app
1. Clone the repository
2. On your terminal, go to the cloned repository
3. Install dependencies:

    ```
    npm i
    ```
4. Run the application:

    ```
    npm start
    ```
5. Navigate to `http://localhost:4200/`

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Review 2023

As agreed with Altar.io, the code base was unchanged from 2022 (with the exception of some indentation fixes for better reading) and the following review was added.


## Generator

### Don't use functions in template expressions
It can have a negative impact on performance, because every time Angular runs change detection the function will be executed. In the case of `getNumberOfColumns` and `getRowHeight` simple properties would do. ([generator.component.html](src/app/generator/generator.component.html#L31))

Instead of using `{{displayCellValue(cell)}}` I would create a `Pipe` to display cells, `{{cell | displayCell}}`. This would also avoid the constant calculation of the cell's display. The cell display would only be calculated when the actual `cell` would change. ([generator.component.html](src/app/generator/generator.component.html#L50))

### Component testing
I would do some component testing. For example, the generate button is an excelent candidate to have some tests, as I could test multiple clicks on the button to ensure only one 'timer' is running.

I could also test the weighted character input for the disable requirement (4 seconds between character input).

## Live Status

### [live.status.component.ts](src/app/live-status/live-status.component.ts)
The `generating()` function should be turned into a property of the `LiveStatusComponent`, following the previously explained reasoning.

## Payments

### [payments.component.ts](src/app/payments/payments.component.ts)
I would remove the method `getCode`, and access directly `grid.code`.

I believe at the time I tried simulating an HTTP GET request with `getPayments`. If an `addPayment` was successful, we could fetch the new payments data from the backend.

In the function [onFormSubmit](src/app/payments/payments.component.ts#L81), the payment I create is receiving the Grid object instead of the grid array. This grid object is the object that is being modified by the generator. This means that the payment I'm storing doesn't have the grid used for the payment but the most recent grid. This is a critical bug for the payment storage requirement.

This also reveals the necessity of having better testing.

## Grid

### [grid.ts](src/app/grid.ts)
I think the algorithm could be better documented or use more auxiliar private functions to improve legibility.

The `populate` function has two responsibilities: populating and counting. This makes it hard to test those responsibilities. For a more easier way of testing, the counting of characters could be done separately from the grid generation/population.

## Subscriptions
There are some subscriptions that I believe are leaking, (e.g., [time.service.ts](src/app/time.service.ts#L20) has a subscriptions on a Subject that isn't `unsubscribe`d). This should be done in the `ngOnDestroy` of the respective services or components.
