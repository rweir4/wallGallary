import React, { useState } from 'react';
import Card from './components/Card';
import { CLIMBING_GYMS } from '../gymSeed';

const App = () => {
  const [currentGym, setCurrentGym] = useState(CLIMBING_GYMS[0])

  return (<Card gym={currentGym} setCurrentGym={setCurrentGym} />);
}

export default App;