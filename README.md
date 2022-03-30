# Wordle clone app

## Working on: Creating custom http hook.(random words api);

## Problem:

### getting stuck on how to move on to the next guess(next array) after submitting the first attempt.

## solution:

### created default template with empty string and used for Board component and update

### created useState for current positions (user attempt row and letter position) (not sure this is the best solution)

## Problem:

## When user uses keyboard for inputs after using keyboard simulator on screen for inputs, letters are added with blank cells in between

## what cause: Key component. if I change the '<button>' inside of the Key component as div, it works fine. need to find out why it happens.(onClick?)

## need to fix later:

## 1. Keyboard component. Now It works ok but i'm not convinced to use useCallback.

## 2. Animation for Letter component. It works fine but... could be more simple way?

## 3. Default value for board-context.
