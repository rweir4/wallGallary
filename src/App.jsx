import React, { useState } from 'react';
import Card from './components/Card';

const App = () => {
  const [currentGym, setCurrentGym] = useState(1)

  return (
    <div className="gym-page">
      <Card currentGym={currentGym} setCurrentGym={setCurrentGym} />
      <h1 className='reviews'>What people are saying:</h1>
    </div>
  );
}

export default App;