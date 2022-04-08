import styles from './Button.module.css'

const Button = ({ name, onClick, btnStyle, active }) => {
    let newStyle = '';
    if (btnStyle === 'normal') newStyle = styles['normal-btn'];
    if (btnStyle === 'modal') newStyle = styles['modal-btn'];
    if (btnStyle === 'toggle') newStyle = styles['togle-btn']

    return <button onClick={onClick} className={`${newStyle} ${active ? styles['active'] : ''}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {name}
    </button>
};

export default Button;