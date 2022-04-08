import Letter from './Letter';
import styles from './Row.module.css';

const Row = ({ attempt, wordLength }) => {

    // Check the current remaining space.
    // const remaining = letterLength - onUserWord.length;
    // fill with an empty string if there is still space for the next letter.
    // const letters = onUserWord.split('').concat(Array(remaining).fill(''));
    // console.log(letters);
    return (
        <div className={styles['row-container']}>

            {Array(wordLength).fill('').map((_, index) => <Letter key={index} attempt={attempt} letterPos={index} />)}
        </div>
    )
};

export default Row;