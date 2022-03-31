import { useState, useContext } from 'react';
import useFetchWords from '../../hooks/use-fetchWords';
import BoardContext from '../store/board-context';

const LoadingPage = ({ onStartGame }) => {
    const { setWord, } = useContext(BoardContext);
    const { error, sendRequest, } = useFetchWords();
    const [level, setLevel] = useState(null);

    const wordHandler = (word) => {
        setWord(word);
    }


    const startGameHandler = () => {
        sendRequest({ url: 'https://random-word-api.herokuapp.com/word?number=20' }, level, wordHandler);
        onStartGame(true);
    }

    const levelHandler = (e) => {
        setLevel(+e.target.value);
    }
    return (
        <section>
            <div>
                <h2>Level :</h2>
                <input
                    type="radio"
                    name='levelOfDifficulty'
                    value='5'
                    onChange={levelHandler}
                />Nomal
                <input
                    type="radio"
                    name='levelOfDifficulty'
                    value='7'
                    onChange={levelHandler}
                />Hard
            </div>
            <h2>topic :</h2>
            {error && <p>{error}</p>}
            <button onClick={startGameHandler}>start</button>
        </section>
    )
}

export default LoadingPage;