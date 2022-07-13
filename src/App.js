import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Loading from "./components/helper/Loading";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  async function fecthMoviesHandler() {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setIsLoading(false);
      setMovies(transformedMovies);
    } catch(error) {
      setError(error.message)
    }
    setIsLoading(false);
  }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fecthMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && <p>No movies found</p>}
        {isLoading && !error && <Loading />}
        {error &&  <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
