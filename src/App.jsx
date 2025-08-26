import React, { useState } from 'react';
import Card from './components/Card';
import GymServicesPieChart from './components/Services';
import { ProgrammableSearch } from './components/GoogleSearch';

import { CLIMBING_GYMS } from '../gymSeed';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([])

  // Normalize the active list: map Google results to gym-like objects
  const normalizedSearchResults = searchResults.map((r, idx) => ({
    id: idx + 1,
    name: r.title || r.displayLink || 'Result',
    city: r.extractedCity || r.displayLink || '',
    website: r.link,
    services: r.extractedServices || [],
  }));

  const activeList = normalizedSearchResults.length > 0 ? normalizedSearchResults : CLIMBING_GYMS;
  const currentGym = activeList[activeIndex];
  
  const goPrev = () => setActiveIndex((i) => (i > 0 ? i-- : 0));
  const goNext = () => setActiveIndex((i) => (i < activeList.length - 1 ? i++ : i));
  const onResults = (items) => { 
    setSearchResults(items || [])
    setActiveIndex(0)
  }

  return (
    <div className="gym-page-container">
      <h1>WALL GALLERY</h1>
      <div className="gym-page">
        <ProgrammableSearch onResults={onResults} currentGymIndex={activeIndex} setActiveIndex={setActiveIndex}/>

        <Card currentGym={currentGym} onPrev={goPrev} onNext={goNext} />
        {currentGym?.services && currentGym.services.length > 0 && (
          <div className='reviews'>
            <h1>About the gym:</h1>
            <GymServicesPieChart services={currentGym.services}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;