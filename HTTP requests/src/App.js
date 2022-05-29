import React, { useCallback, useEffect, useState } from "react";
import './App.css';

import MovieList from './components/MoviesList';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();

      const TransformMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      })
      setMovies(TransformMovies);
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [])
  
  let content = <p>Found no movies</p>

  if (movies.length > 0) {
    content = <MovieList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch movies</button>
      </section>
      <section>
        {content}
      </section>
    </>
  )
};
export default App;

// import React, { useState } from 'react';

// import MoviesList from './components/MoviesList';
// import './App.css';

// function App() {

//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false)

//   async function fetchMoviesHandler() {
//     setIsLoading(true);
//     const response = await fetch('https://swapi.dev/api/films');
//     const data = await response.json();
//     const transformMovies = data.results.map(movieData => {
//       return {
//         id: movieData.episode_id,
//         title: movieData.title,
//         openingText: movieData.opening_crawl
//       }
//     });
//     setMovies(transformMovies);
//     setIsLoading(false)
//   };

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {!isLoading && movies.length === 0 && <p>Found no movies</p>}
//         {isLoading && <p>Loading...</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
