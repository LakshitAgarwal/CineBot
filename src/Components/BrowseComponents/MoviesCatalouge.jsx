import NowPlaying from "./NowPlaying";
import { useSelector } from "react-redux";
import PopularMovies from "./PopularMovies";
import UpcomingMovies from "./UpcomingMovies";
import PopularTVSeries from "./PopularTVSeries";
import OnAirSeries from "./OnAirSeries";

const MoviesCatalouge = () => {
  const store = useSelector((store) => store.movies);
  // console.log(nowPlayingMovies);
  return (
    <div>
      <NowPlaying movies={store.nowPlayingMovies} />
      <UpcomingMovies upcomingMovies={store.upcomingMovies} />
      <PopularTVSeries popularTVSeries={store.popularTVSeries} />
      <PopularMovies popularMovies={store.popularMovies} />
      <OnAirSeries onAir={store.onAirSeries} />
    </div>
  );
};

export default MoviesCatalouge;
