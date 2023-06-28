import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customError, setCustomError] = useState(null);
  const [retry,setRetry] = useState(true)

  async function dummyMovies() {

    setIsLoading(true)
    setCustomError(null)
    try {
      const res = await fetch("https://swapi.dev/api/film");
     
      console.log(res)
      if (res.ok === false) {
        throw new customError("something went wrong retrying...")
      }
      const res2 = await res.json();
      
      console.log(res2);
      

      setMovies(res2.results)
      setIsLoading(false)
    }
    catch(error)
    {
      setCustomError(error.message)
    }
    if(!retry)
    setIsLoading(false)

    
  }

  function stopRetry()
  {
    setIsLoading(false)
    setRetry(true)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={dummyMovies}>Fetch Movies</button>
        <button onClick={stopRetry}>Stop retrying</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading data....</p>}
        {!isLoading && customError && <p>{customError}</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
