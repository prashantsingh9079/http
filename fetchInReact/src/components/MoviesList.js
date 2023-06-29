import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          title={movie.title}
          releaseDate={movie["date"]}
          openingText={movie["text"]}
          deleteMovie={props.deleteMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
