import { useState } from 'react';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

const ProgrammableSearch = ({ onResults }) => {
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
      setResults(data.items || []);
      if (onResults) onResults(data.items || []);
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
          {results.map((result, index) => (
            <div key={index} className="search-result">
              <h5>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              </h5>
              <p>{result.snippet}</p>
            </div>
          ))}
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