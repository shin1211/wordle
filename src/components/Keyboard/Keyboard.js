import React, { useEffect, useContext, useCallback, useState, useMemo } from 'react';
import Key from './Key';
import BoardContext from '../store/board-context';

import styles from './Keyboard.module.css';

const Keyboard = () => {
    const { onEnter, onDelete, onSelectLetter, letterStatus } = useContext(BoardContext);
    const [pressed, setPressed] = useState('');
    const firstRow = useMemo(() => ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], []);
    const secondRow = useMemo(() => ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], []);
    const thirdRow = useMemo(() => ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], []);

    const keyHandler = useCallback((event) => {
        if (event.key === 'Enter') {
            setPressed(event.key);
            onEnter();
        } else if (event.key === 'Backspace') {
            setPressed('Delete');
            onDelete();

        } else {
            firstRow.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key);
                    setPressed(key.toLowerCase());
                }
            })

            secondRow.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                    setPressed(key.toLowerCase())
                }
            })

            thirdRow.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                    setPressed(key.toLowerCase())
                }
            })

        }
    }, [onSelectLetter, firstRow, secondRow, thirdRow, onDelete, onEnter])
    useEffect(() => {
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('keydown', keyHandler);
        }
    }, [keyHandler])
    return (
        <div className={styles['keyboard-container']} onKeyDown={keyHandler}>
            <div className={styles['keyboard-row']}>
                {firstRow.map((key, index) => {
                    return <Key
                        key={index}
                        keyValue={key}
                        pressed={pressed === key.toLowerCase() ? true : false}
                        correct={letterStatus.correctLetters.includes(key.toLocaleLowerCase())}
                        included={letterStatus.closeLetters.includes(key.toLocaleLowerCase())}
                        disable={letterStatus.wrongLetters.includes(key.toLocaleLowerCase())}
                    />
                })}
            </div>
            <div className={styles['keyboard-row']}>
                {secondRow.map((key, index) => {
                    return <Key
                        key={index}
                        keyValue={key}
                        pressed={pressed === key.toLowerCase() ? true : false}
                        correct={letterStatus.correctLetters.includes(key.toLocaleLowerCase())}
                        included={letterStatus.closeLetters.includes(key.toLocaleLowerCase())}
                        disable={letterStatus.wrongLetters.includes(key.toLocaleLowerCase())}
                    />
                })}
            </div>
            <div className={styles['keyboard-row']}>
                <Key keyValue='DELETE' pressed={pressed === 'Delete' ? true : false} />

                {thirdRow.map((key, index) => {
                    return <Key
                        key={index}
                        keyValue={key}
                        pressed={pressed === key.toLowerCase() ? true : false}
                        correct={letterStatus.correctLetters.includes(key.toLocaleLowerCase())}
                        included={letterStatus.closeLetters.includes(key.toLocaleLowerCase())}
                        disable={letterStatus.wrongLetters.includes(key.toLocaleLowerCase())}
                    />
                })}
                <Key keyValue='ENTER' pressed={pressed === 'Enter' ? true : false} />

            </div>
        </div>)
};

export default Keyboard;