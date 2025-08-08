import { useEffect, useState } from 'react';
import './navbar.css';

function Navbar() {
	let yearNow = new Date();
	let [fullYearNow, setFullYearNow] = useState(yearNow.getFullYear() + 1);

	let [minMovieYear, setMinMovieYear] = useState(localStorage.getItem('minMovieYear') || 1874);
	let [maxMovieYear, setMaxMovieYear] = useState(localStorage.getItem('maxMovieYear') || fullYearNow);
	let [minMovieRating, setMinMovieRating] = useState(localStorage.getItem('minMovieRating') || 0.0);
	let [maxMovieRating, setMaxMovieRating] = useState(localStorage.getItem('maxMovieRating') || 10.0);
	let [minMovieDuration, setMinMovieDuration] = useState(localStorage.getItem('minMovieDuration') || 30);
	let [maxMovieDuration, setMaxMovieDuration] = useState(localStorage.getItem('maxMovieDuration') || 240);
	let [movieGenre, setMovieGenre] = useState(localStorage.getItem('movieGenre') || 0);

	useEffect(() => {
		localStorage.setItem('minMovieYear', minMovieYear);
		localStorage.setItem('maxMovieYear', maxMovieYear);

		localStorage.setItem('minMovieRating', minMovieRating);
		localStorage.setItem('maxMovieRating', maxMovieRating);

		localStorage.setItem('minMovieDuration', minMovieDuration);
		localStorage.setItem('maxMovieDuration', maxMovieDuration);
		localStorage.setItem('movieGenre', movieGenre);
	}, [minMovieYear, maxMovieYear, minMovieRating, maxMovieRating, minMovieDuration, maxMovieDuration, movieGenre]);

	function githubRepoLocation() {
		window.location.href = 'https://github.com/sh4man4ik/MoviesTok';
	}

	return (
		<>
			<div className="navbar-container">
				<div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
					<div className="p-4">
						<div className="year-controller">
							<label htmlFor="min-year">Min year: ({minMovieYear})</label>
							<input
								type="range"
								name="min-year"
								className="min-year"
								id="min-year"
								min={1874}
								max={fullYearNow}
								step={1}
								defaultValue={minMovieYear}
								onChange={(event) => setMinMovieYear(event.target.value)}
							/>
							<label htmlFor="max-year">Max year: ({maxMovieYear})</label>
							<input
								type="range"
								name="max-year"
								className="max-year"
								id="max-year"
								min={1874}
								max={fullYearNow}
								step={1}
								defaultValue={maxMovieYear}
								onChange={(event) => setMaxMovieYear(event.target.value)}
							/>
						</div>

						<div className="rating-controller">
							<label htmlFor="min-movie-rating">Min rating: ({minMovieRating})</label>
							<input
								type="range"
								name="min-movie-rating"
								className="min-movie-rating"
								id="min-movie-rating"
								min={0.0}
								max={10.0}
								step={0.1}
								defaultValue={minMovieRating}
								onChange={(event) => setMinMovieRating(event.target.value)}
							/>
							<label htmlFor="max-movie-rating">Max rating: ({maxMovieRating})</label>
							<input
								type="range"
								name="max-movie-rating"
								className="max-movie-rating"
								id="max-movie-rating"
								min={0.0}
								max={10.0}
								step={0.1}
								defaultValue={maxMovieRating}
								onChange={(event) => setMaxMovieRating(event.target.value)}
							/>
						</div>

						<div className="duration-controller">
							<label htmlFor="min-movie-duration">Min duration: ({minMovieDuration})</label>
							<input
								type="range"
								name="min-movie-duration"
								className="min-movie-duration"
								id="min-movie-duration"
								min={30}
								max={240}
								step={1}
								defaultValue={minMovieDuration}
								onChange={(event) => setMinMovieDuration(event.target.value)}
							/>
							<label htmlFor="max-movie-duration">Max duration: ({maxMovieDuration})</label>
							<input
								type="range"
								name="max-movie-duration"
								className="max-movie-duration"
								id="max-movie-duration"
								min={30}
								max={240}
								step={1}
								defaultValue={maxMovieDuration}
								onChange={(event) => setMaxMovieDuration(event.target.value)}
							/>
						</div>

						<select
							name="select-movie-genre"
							className="select-movie-genre"
							defaultValue={movieGenre}
							onChange={(event) => setMovieGenre(event.target.value)}
						>
							<option value="0">All Genres</option>
							<option value="28">Action</option>
							<option value="12">Adventure</option>
							<option value="16">Animation</option>
							<option value="35">Comedy</option>
							<option value="80">Crime</option>
							<option value="18">Drama</option>
							<option value="27">Horror</option>
							<option value="10749">Romance</option>
							<option value="878">Science Fiction</option>
							<option value="53">Thriller</option>
						</select>
					</div>
				</div>
				<nav className="navbar navbar-dark">
					<div className="container-fluid">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarToggleExternalContent"
							aria-controls="navbarToggleExternalContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<h1 className="title display-6">MoviesTok</h1>
						<h1 className="github-link-text display-6" onClick={githubRepoLocation}>
							GitHub
						</h1>
						<i className="github-link-logo bi bi-github" onClick={githubRepoLocation}></i>
					</div>
				</nav>
			</div>
		</>
	);
}

export default Navbar;
