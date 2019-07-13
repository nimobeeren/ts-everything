import * as React from 'react';
import { useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);

    const incrementCounter = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={incrementCounter}>Count</button>
        </div>
    );
}
