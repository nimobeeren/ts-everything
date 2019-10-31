import React, { useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>
        Counter: <span>{count}</span>
      </h1>
      <button type="button" onClick={incrementCounter}>
        Count
      </button>
    </div>
  );
};
