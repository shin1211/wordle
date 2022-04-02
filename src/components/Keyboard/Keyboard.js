import React, { useEffect, useContext, useCallback, useState } from 'react';
import Key from './Key';
import BoardContext from '../store/board-context';

import styles from './Keyboard.module.css';

const Keyboard = () => {
    const [pressed, setPressed] = useState('');
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const { onEnter, onDelete, onSelectLetter } = useContext(BoardContext);

    const keyHandler = useCallback((event) => {
        if (event.key === 'Enter') {
            onEnter();
            setPressed(event.key)
        } else if (event.key === 'Backspace') {
            onDelete();
            setPressed(event.key)

        } else {
            firstRow.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                    setPressed(event.key)


                }
            })

            secondRow.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                    setPressed(event.key)


                }
            })

            thirdRow.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key)
                    setPressed(event.key)

                }
            })

            // let regex = /[a-z]/i.test(e.key);
            // console.log(regex)
            // if (regex) {
            //     onSelectLetter(e.key);
            // }

        }
    })
    useEffect(() => {
        document.addEventListener('keydown', keyHandler);
        document.addEventListener('keyup', () => setPressed(''));
        return () => {
            document.removeEventListener('keydown', keyHandler);
            document.addEventListener('keyup', () => setPressed(''));

        }
    }, [keyHandler])

    return (
        <div className={styles['keyboard-container']} onKeyDown={keyHandler}>
            <div className={styles['keyboard-row']}>
                {firstRow.map((key, index) => {
                    return <Key key={index} keyValue={key} pressed={pressed === key.toLowerCase() ? true : false} />
                })}
            </div>
            <div className={styles['keyboard-row']}>
                {secondRow.map((key, index) => {
                    return <Key key={index} keyValue={key} pressed={pressed === key.toLowerCase() ? true : false} />
                })}
            </div>
            <div className={styles['keyboard-row']}>
                <Key keyValue='ENTER' pressed={pressed === 'Enter' ? true : false} />
                {thirdRow.map((key, index) => {
                    return <Key key={index} keyValue={key} pressed={pressed === key.toLowerCase() ? true : false} />
                })}
                <Key keyValue='DELETE' pressed={pressed === 'Delete' ? true : false} />
            </div>
        </div>)
};

export default Keyboard;