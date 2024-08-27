import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import "./styles.css";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		async function fetchMovies() {
			const response = await fetch("movies.json");
			setMovies(await response.json());
		}
		fetchMovies();
	}, []);

	const toggleWatchlist = (movieId) => {
		setWatchlist((prev) =>
			prev.includes(movieId)
				? prev.filter((id) => id !== movieId)
				: [...prev, movieId],
		);
	};

	return (
		<div className="App">
			<div className="container">
				<Header />
				<Router>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/watchlist">Watchlist</Link>
							</li>
						</ul>
					</nav>
					<Routes>
						<Route
							path="/"
							element={
								<MoviesGrid
									movies={movies}
									watchlist={watchlist}
									toggleWatchlist={toggleWatchlist}
								/>
							}
						/>
						<Route
							path="/watchlist"
							element={
								<Watchlist
									movies={movies}
									watchlist={watchlist}
									toggleWatchlist={toggleWatchlist}
								/>
							}
						/>
					</Routes>
				</Router>
			</div>

			<Footer />
		</div>
	);
}
