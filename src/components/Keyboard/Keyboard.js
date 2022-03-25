import React from 'react';
import Key from './Key';
import styles from './Keyboard.module.css';

const Keyboard = () => {
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];


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