import { useSelector } from "react-redux";
import MovieList from "./MoviesList";

const MoviesCatalouge = () => {
  const store = useSelector((store) => store.movies);
  // console.log(nowPlayingMovies);
  return (
    <div className="md:pt-[40%] pt-[8%] pb-12">
      <MovieList movies={store.nowPlayingMovies} title="Now Playing Movies" />
      <MovieList movies={store.popularTVSeries} title="Popular TV Series" />
      <MovieList movies={store.upcomingMovies} title="Upcoming Movies" />
      <MovieList movies={store.onAirSeries} title="On Air Series" />
      <MovieList movies={store.popularMovies} title="Popular Movies" />
    </div>
  );
};

export default MoviesCatalouge;
