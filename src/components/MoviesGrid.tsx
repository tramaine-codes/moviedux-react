import type React from "react";
import { useState } from "react";
import type { Movie } from "../App";
import "../styles.css";
import MovieCard from "./MovieCard";

interface MoviesGridProps {
	readonly movies: readonly Movie[];
	readonly watchlist: readonly number[];
	readonly toggleWatchlist: (movieId: number) => void;
}

export default function MoviesGrid({
	movies,
	watchlist,
	toggleWatchlist,
}: MoviesGridProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [genre, setGenre] = useState("All Genres");
	const [rating, setRating] = useState("All");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setGenre(e.target.value);
	};

	const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRating(e.target.value);
	};

	const matchesSearchTerm = (movie: Movie, searchTerm: string) =>
		movie.title.toLowerCase().includes(searchTerm.toLowerCase());

	const matchesGenre = (movie: Movie, genre: string) =>
		genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();

	const matchesRating = (movie: Movie, rating: string) => {
		switch (rating) {
			case "All":
				return true;
			case "Good":
				return Number.parseFloat(movie.rating) >= 8;
			case "Ok":
				return (
					Number.parseFloat(movie.rating) >= 5 &&
					Number.parseFloat(movie.rating) < 8
				);
			case "Bad":
				return Number.parseFloat(movie.rating) < 5;
			default:
				return false;
		}
	};

	const filteredMovies = movies.filter(
		(movie) =>
			matchesSearchTerm(movie, searchTerm) &&
			matchesGenre(movie, genre) &&
			matchesRating(movie, rating),
	);

	return (
		<>
			<input
				type="text"
				className="search-input"
				placeholder="Search movies . . ."
				value={searchTerm}
				onChange={handleSearchChange}
			/>

			<div className="filter-bar">
				<div className="filter-slot">
					<label>Genre</label>
					<select
						className="filter-dropdown"
						value={genre}
						onChange={handleGenreChange}
					>
						<option>All Genres</option>
						<option>Action</option>
						<option>Drama</option>
						<option>Fantasy</option>
						<option>Horror</option>
					</select>
				</div>

				<div className="filter-slot">
					<label>Rating</label>
					<select
						className="filter-dropdown"
						value={rating}
						onChange={handleRatingChange}
					>
						<option>All</option>
						<option>Good</option>
						<option>Ok</option>
						<option>Bad</option>
					</select>
				</div>
			</div>

			<div className="movies-grid">
				{filteredMovies.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						isWatchlisted={watchlist.includes(movie.id)}
						toggleWatchlist={toggleWatchlist}
					/>
				))}
			</div>
		</>
	);
}
