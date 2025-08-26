import { useState } from 'react';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID; 

const ProgrammableSearch = ({ onResults, currentGymIndex, setActiveIndex }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchGyms = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${searchQuery}`
      );
      
      const data = await response.json();
      
      // Process results to extract services and location info
      const processedResults = (data.items || []).map((item, idx) => {
        // Combine title and snippet for content analysis
        const content = `${item.title || ''} ${item.snippet || ''}`.toLowerCase();
        
        // Define service keywords to look for
        const serviceKeywords = {
          'Bouldering': ['bouldering', 'boulder', 'boulder wall', 'boulder room'],
          'Top Rope': ['top rope', 'top roping', 'rope climbing', 'belay', 'top rope wall'],
          'Lead Climbing': ['lead climbing', 'lead', 'sport climbing', 'lead wall'],
          'Auto Belay': ['auto belay', 'autobelay', 'auto-belay', 'auto belay wall'],
          'Fitness': ['fitness', 'gym', 'workout', 'training', 'exercise'],
          'Yoga': ['yoga', 'pilates', 'stretching', 'meditation'],
          'Training': ['training', 'classes', 'lessons', 'instruction', 'coaching'],
          'Equipment': ['equipment', 'gear', 'rental', 'shop', 'pro shop']
        };
        
        // Find matching services
        const foundServices = [];
        Object.entries(serviceKeywords).forEach(([service, keywords]) => {
          if (keywords.some(keyword => content.includes(keyword))) {
            foundServices.push(service);
          }
        });
        
        // Extract city from displayLink or snippet
        let city = '';
        if (item.displayLink) {
          // Try to extract city from domain (e.g., "knoxville.onsightrockgym.com" -> "Knoxville")
          const domainParts = item.displayLink.split('.');
          if (domainParts.length > 2) {
            city = domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1);
          }
        }
        
        // If no city found, try to extract from snippet
        if (!city && item.snippet) {
          const cityMatch = item.snippet.match(/(\w+),?\s+(TN|GA|NC|SC|KY|VA|AL)/i);
          if (cityMatch) {
            city = cityMatch[1];
          }
        }
        
        return {
          ...item,
          id: idx + 1,
          extractedCity: city || 'Unknown',
          extractedServices: foundServices
        };
      });
      
      setResults(processedResults);
      if (onResults) onResults(processedResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchGyms(query);
    }
  };

  return (
    <div className="programmable-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for climbing gyms..."
          className="search-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {results.length > 0 && (
        <div className="search-results">
          <h4>Search Results:</h4>
          {results.map((result, index) => {
            const isCurrent = index === currentGymIndex ? 'selected-background' : '';
            return (
              <div key={index} className={`search-result ${isCurrent}`} onClick={() => setActiveIndex(index)}>
                <h5>
                  <a href={result.link} target="_blank" rel="noopener noreferrer">
                    {result.title}
                  </a>
                </h5>
                <p>{result.snippet}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export { ProgrammableSearch };


const searchGyms = (query) => {
  return CLIMBING_GYMS.filter(gym => 
    gym.name.toLowerCase().includes(query.toLowerCase()) ||
    gym.city.toLowerCase().includes(query.toLowerCase()) ||
    gym.services.some(service => service.toLowerCase().includes(query.toLowerCase()))
  );
};