import React from 'react';
import { useCount } from './services/CountService';

function App() {
  const { count, increment, decrement } = useCount()
  return (
    <div>
      <h1>Counter</h1>
      <p>
        Count: {count}
        {' '}
        <button onClick={increment}>+</button>
        <button onClick={decrement} disabled={count <= 0}>-</button>
      </p>
    </div>
  );
}

export default App;
