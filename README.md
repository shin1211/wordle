# Wordle clone app

## Working on: Creating custom http hook.(random words api);

## Problem:

### getting stuck on how to move on to the next guess(next array) after submitting the first guess.

## solution:

### created default template with empty string to be used for Board component and update upon user's inputs

### created useState for current positions (user attempt row and letter position) (not sure this is the best solution)

## Problem:

### When user uses keyboard for inputs after using keyboard simulator on screen for inputs, letters are added with blank cells in between

### what cause: Key component. if I change the '<button>' inside of the Key component as div, it works as expected. need to find out why this is happening.(onClick?)

## need to fix later:

### 1. Keyboard component. Now it works ok but i'm not convinced to use useCallback.

### 2. Animation for Letter component. It works fine but... could it be more simple?

### 3. Default value for board-context.
