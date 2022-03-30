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
            {/* <Letter attempt={attempt} letterPos={0} />
            <Letter attempt={attempt} letterPos={1} />
            <Letter attempt={attempt} letterPos={2} />
            <Letter attempt={attempt} letterPos={3} />
            <Letter attempt={attempt} letterPos={4} />
            <Letter attempt={attempt} letterPos={5} />
            <Letter attempt={attempt} letterPos={6} /> */}

        </div>
    )
};

export default Row;