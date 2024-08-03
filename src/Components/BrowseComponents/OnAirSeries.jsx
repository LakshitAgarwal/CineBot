import MovieCard from "./MovieCard";

const OnAirSeries = ({ onAir }) => {
  return (
    <div>
      <div className="my-6">
        <div className="ml-12">
          <p className="text-3xl relative z-30 archivo-black-regular mb-8 text-white">
            On Air Series
          </p>
          <div className="relative z-10 overflow-x-scroll whitespace-nowrap hidding-scrollbar">
            <div className="inline-flex space-x-6">
              {onAir
                ? onAir.map((onAirSeries, index) => (
                    <MovieCard
                      key={index}
                      moviePosterPath={onAirSeries.poster_path}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnAirSeries;
