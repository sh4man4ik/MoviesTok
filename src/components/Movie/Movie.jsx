import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import './movie.css';
import 'animate.css';

function Movie() {
	const apiKey = '0e533002c00fffd5fb499b51003a16c0';

	let [poster, setPoster] = useState();
	let [movieTitle, setMovieTitle] = useState();
	let [movieRating, setMovieRating] = useState();
	let [movieYear, setMovieYear] = useState();
	let [movieLength, setMovieLength] = useState();
	let [movieDescription, setMovieDescription] = useState();

	let movieContainer = useRef();

	async function getRandomMovie() {
		if (movieContainer.current) {
			movieContainer.current.classList.remove('animate__animated', 'animate__pulse');
			void movieContainer.current.offsetWidth;
			movieContainer.current.classList.add('animate__animated', 'animate__pulse');
		}

		let randomPage = Math.floor(Math.random() * 500 + 1);

		let result = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${randomPage}`);
		let movies = await result.json();

		let randomIndex = Math.floor(Math.random() * movies.results.length);
		let randomMovie = movies.results[randomIndex];

		let movieDetailsRes = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=${apiKey}`);
		let movieDetails = await movieDetailsRes.json();

		setPoster(`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`);
		setMovieTitle(randomMovie.title);
		setMovieRating(randomMovie.vote_average.toFixed(1));
		setMovieYear(randomMovie.release_date.match(/\d{4}/));
		setMovieLength(movieDetails.runtime + 'm');
		setMovieDescription(randomMovie.overview.substring(0, 150) + '...');
	}

	useEffect(() => {
		getRandomMovie();

		return () => {};
	}, []);

	const handlers = useSwipeable({
		onSwipedUp: () => {
			getRandomMovie();
		},
		trackMouse: true
	});

	return (
		<>
			<div className="movie-container" ref={movieContainer}>
				<div className="movie-container-2" ref={movieContainer} {...handlers}>
					<img src={poster} alt="poster" className="movie-poster" />
					<h1 className="movie-title display-6">{movieTitle}</h1>
					<span className="movie-data">
						<i className="bi bi-star-fill"></i>
						<p className="movie-rating">{movieRating}</p>
						<p>•</p>
						<p className="movie-year">{movieYear}</p>
						<p>•</p>
						<p className="movie-length">{movieLength}</p>
					</span>
					<p className="movie-description">{movieDescription}</p>
				</div>
			</div>
		</>
	);
}

export default Movie;
