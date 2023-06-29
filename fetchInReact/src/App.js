import React, { useState, useEffect, useCallback } from 'react';
import Form from './components/Form';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-3c9e4-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data)

      const loadedMovies = [];

      for(const key in data)
      {
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].text,
          date:data[key].date
        })
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList deleteMovie={deleteMovie} movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  async function deleteMovie(id)
  {
    console.log(id)
  }

  async function addMovies(obj)
  {
    const response = await fetch("https://react-http-3c9e4-default-rtdb.firebaseio.com/movies.json",{
      method:'POST',
      body:JSON.stringify(obj),
      headers:{'Content-Type':'application/json'}
    })
    const data = await response.json();
    console.log(data)
  }

  return (
    <React.Fragment>
      
      <section>
      <Form addMovies={addMovies}/>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;