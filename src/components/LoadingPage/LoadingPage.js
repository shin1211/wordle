import { useState, useContext } from 'react';
import BoardContext from '../store/board-context';
import useFetchWords from '../../hooks/use-fetchWords';
// import useAxiosFetch from '../../hooks/useAxiosFetch';


const LoadingPage = ({ onStartGame, startGame }) => {
    const { setWord, difficulty, setDifficulty, wordHandler } = useContext(BoardContext);


    const { sendRequest, error, isLoading } = useFetchWords();



    const startGameHandler = () => {
        sendRequest({ url: 'https://random-word-api.herokuapp.com/word?number=50' }, difficulty, wordHandler);
        onStartGame(true);
    }

    const levelHandler = (e) => {
        setDifficulty(+e.target.value);
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