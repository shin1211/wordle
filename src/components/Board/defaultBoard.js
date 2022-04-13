
// create default board 
export const board = (totalAttempt, length) => {

    let defaultBoard = [];
    for (let i = 0; i < totalAttempt; i++) {
        const row = Array(length).fill('');
        defaultBoard.push(row);
    }
    return defaultBoard;
}
