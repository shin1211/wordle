import { useState } from 'react';
import Button from './Button';

const types = ['Normal', 'Hard'];

const ToggleGroup = ({ levelHandler }) => {
  const [active, setActive] = useState('');
  return (
    <>
      {types.map(type => (
        <Button
          key={type}
          active={active === type}
          onClick={() => {
            setActive(type)
            levelHandler(type === 'Normal' ? 5 : 7)
          }}
          name={type}
        >
        </Button>
      ))}
    </>
  );
}

export default ToggleGroup