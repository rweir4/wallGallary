import React, { useState } from 'react';
import Card from './components/Card';

const App = () => {
  const [currentGym, setCurrentGym] = useState(1)

  return (<Card currentGym={currentGym} setCurrentGym={setCurrentGym} />);
}

export default App;