import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function dummyMovies()
  {
    setIsLoading(true)
    const res = await fetch("https://swapi.dev/api/films");
    
    const res2 = await res.json();

    setMovies(res2.results)
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={dummyMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading data....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
