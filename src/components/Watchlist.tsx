import type { Movie } from "../App";
import MovieCard from "./MovieCard";

interface WatchlistProps {
  readonly movies: readonly Movie[];
  readonly watchlist: readonly number[];
  readonly toggleWatchlist: (movieId: number) => void;
}

export default function Watchlist({
  movies,
  watchlist,
  toggleWatchlist,
}: WatchlistProps) {
  return (
    <div>
      <h1 className="title">Your Watchlist</h1>

      <div className="watchlist">
        {watchlist.map((id) => {
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          const movie = movies.find((movie) => movie.id === id)!;
          return (
            <MovieCard
              key={id}
              movie={movie}
              isWatchlisted={true}
              toggleWatchlist={toggleWatchlist}
            />
          );
        })}
      </div>
    </div>
  );
}
