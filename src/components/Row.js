import styles from './Row.module.css';

const Row = ({ onUserWord = '', givenWord }) => {
    const letterLength = 5;

    // Check the current remaining space.
    // const remaining = letterLength - onUserWord.length;
    // fill with an empty string if there is still space for the next letter.
    // const letters = onUserWord.split('').concat(Array(remaining).fill(''));
    // console.log(letters);
    return (
        <div className={styles['row-container']}>
            {Array(5).fill('').map((letter, index) =>
                <span key={index} className={styles['letter-container']}>{onUserWord[index]}</span>
            )}
        </div>
    )
};

export default Row;