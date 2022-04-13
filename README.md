# Wordle clone app

## Working on:

- Creating custom http hook.(random words api). It is not working as what I expect. ---- Completed

- Error handling for word api. --- Completed

- Problem 1.

- Need to add another API to check if user's guess is a word or not.

- Overall css aniamtion.

## Problems:

### 1. There was no way to identify whether the guess letter appears more than once or not. (dealing with duplicate letters)

Solution: Working on..

### 2. Getting stuck on how to move on to the next guess(next array) after submitting the first guess.

Solution: Default template with empty string to be used for Board component and update upon user's inputs and created useState for current positions (user attempt row and letter position) (not sure this is the best solution).

### 3. When user uses keyboard for inputs after using keyboard simulator on screen for inputs, letters are added with blank cells in between

What cause: Key component. if I change the "button" inside of the Key component as "div", it works as expected. need to find out why this is happening.(onClick?)

### 4. I need to update state in parent from a child to game start. I am using a prop function in Parent. All works fine except my prop function is getting the previous state and not the current state.

Solution: Passed all the states that I need to start a new game into my custom useAsync component and update thoese states after dispatched.

## Need to fix later:

- Keyboard component. Now it works ok but i'm not convinced to use useCallback.
- Animation for Letter component. It works fine but... could it be more simple?
- Default value for board-context.
