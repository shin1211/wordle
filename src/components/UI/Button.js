import styles from './Button.module.css'

const Button = ({ name, onClick, btnStyle, active }) => {
    let newStyle = '';
    if (btnStyle === 'normal') newStyle = styles['normal-btn']

    return <button onClick={onClick} className={`${newStyle} ${active ? styles['active'] : ''}`}>{name}</button>
};

export default Button;