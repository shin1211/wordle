import React, { useEffect, useContext, useCallback } from 'react';
import Key from './Key';
import BoardContext from '../store/board-context';

import styles from './Keyboard.module.css';

const Keyboard = () => {
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const {
        onEnter,
        onDelete,
        onSelectLetter } = useContext(BoardContext);

    const keyHandler = useCallback((e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            onEnter();
        } else if (e.key === 'Backspace') {
            onDelete();
        } else {
            let regex = /[a-z]/i.test(e.key);
            console.log(regex)
            if (regex) {
                onSelectLetter(e.key);
            }
        }

        // if(e.key.toLowerCase())
    })
    useEffect(() => {
        console.log('re-render')
        document.addEventListener('keydown', keyHandler);

        return () => {
            document.removeEventListener('keydown', keyHandler);
        }
    }, [keyHandler])

    return <div className={styles['keyboard-container']}>
        <div className='row-1'>
            {firstRow.map((key, index) => {
                return <Key key={index} keyValue={key} />
            })}
        </div>
        <div className='row-2'>
            {secondRow.map((key, index) => {
                return <Key key={index} keyValue={key} />
            })}
        </div>
        <div className='row-3'>
            <Key keyValue='ENTER' />
            {thirdRow.map((key, index) => {
                return <Key key={index} keyValue={key} />
            })}
            <Key keyValue='DELETE' />

        </div>
    </div>
};

export default Keyboard;