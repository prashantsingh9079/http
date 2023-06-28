import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies] = useState([]);
  
  async function dummyMovies()
  {
    const res = await fetch("https://swapi.dev/api/films");
    console.log(res)
    const res2 = await res.json();
    console.log(res2)
    setMovies(res2.results)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={dummyMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
