import { useEffect, useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		async function fetchMovies() {
			const response = await fetch("movies.json");
			setMovies(await response.json());
		}
		fetchMovies();
	}, []);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredMovies = movies.filter((movie) =>
		movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
			<div className="movies-grid">
				{filteredMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</>
	);
}
