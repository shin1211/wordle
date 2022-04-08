import { useState } from 'react';
import Button from './Button';
import styles from './ToggleGroup.module.css'

const types = ['Normal', 'Hard'];

const ToggleGroup = ({ levelHandler }) => {
  const [active, setActive] = useState('');
  return (
    <div className={styles.container}>
      {types.map(type => (
        <Button
          key={type}
          active={active === type}
          onClick={() => {
            setActive(type)
            levelHandler(type === 'Normal' ? 5 : 7)
          }}
          name={type}
          btnStyle='toggle'
        >
        </Button>
      ))}
    </div>
  );
}

export default ToggleGroup