import { useState } from 'react';
import styles from './Button.module.css'

const Button = ({ name, onClick, btnStyle }) => {
    const [active, setActive] = useState(false);
    let newStyle = '';
    if (btnStyle === 'normal') newStyle = styles['normal-btn']

    return <button onClick={onClick} className={newStyle}>{name}</button>
};

export default Button;