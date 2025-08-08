import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import swipeImg from '../../assets/swipe.png';
import notFoundImg from '../../assets/not_found.jpg';
import './movie.css';

function Movie() {
	const apiKey = '0e533002c00fffd5fb499b51003a16c0';

	let [poster, setPoster] = useState();
	let [movieTitle, setMovieTitle] = useState();
	let [movieRating, setMovieRating] = useState();
	let [movieYear, setMovieYear] = useState();
	let [movieLength, setMovieLength] = useState();
	let [movieDescription, setMovieDescription] = useState();
	let [isAnimation, setIsAnimation] = useState(true);

	let movieContainer = useRef();
	let swipeImgRef = useRef();

	function setUrl() {
		let minMovieYear = localStorage.getItem('minMovieYear');
		let maxMovieYear = localStorage.getItem('maxMovieYear');

		let minMovieRating = localStorage.getItem('minMovieRating');
		let maxMovieRating = localStorage.getItem('maxMovieRating');

		let minMovieDuration = localStorage.getItem('minMovieDuration');
		let maxMovieDuration = localStorage.getItem('maxMovieDuration');

		let movieGenre = localStorage.getItem('movieGenre');

		let randomPage = Math.floor(Math.random() * 500 + 1);

		let url =
			`https://api.themoviedb.org/3/discover/movie?` +
			`api_key=${apiKey}` +
			`&page=${randomPage}` +
			`&primary_release_date.gte=${minMovieYear}-01-01` +
			`&primary_release_date.lte=${maxMovieYear}-12-31` +
			`&vote_average.gte=${minMovieRating}` +
			`&vote_average.lte=${maxMovieRating}` +
			`&with_runtime.gte=${minMovieDuration}` +
			`&with_runtime.lte=${maxMovieDuration}`;

		//0 = all genres
		if (movieGenre != 0) {
			url += `&with_genres=${movieGenre}`;
		}

		return url;
	}

	async function getRandomMovie() {
		if (movieContainer.current) {
			movieContainer.current.classList.remove('bounceAnimation');
			void movieContainer.current.offsetWidth;
			movieContainer.current.classList.add('bounceAnimation');
		}

		let url = setUrl();

		try {
			let result = await fetch(url);
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
		} catch (error) {
			setPoster(notFoundImg);
			setMovieTitle('Not found');
			setMovieRating('—');
			setMovieYear('—');
			setMovieLength('—');
			setMovieDescription('Not found');
		}
	}

	useEffect(() => {
		getRandomMovie();

		let isAnimationFromStorage = localStorage.getItem('isAnimationFromStorage');

		if (isAnimationFromStorage === null) {
			swipeImgRef.current.style.display = 'block';
			setIsAnimation(true);
		} else {
			setIsAnimation(false);
		}

		return () => {};
	}, []);

	useEffect(() => {
		if (!isAnimation) {
			swipeImgRef.current.style.display = 'none';
			localStorage.setItem('isAnimationFromStorage', 'false');
		}
	}, [isAnimation]);

	const handlers = useSwipeable({
		onSwipedUp: () => {
			getRandomMovie();
			setIsAnimation(false);
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

			<img src={swipeImg} ref={swipeImgRef} alt="swipe" className="swipeImg" />
		</>
	);
}

export default Movie;
