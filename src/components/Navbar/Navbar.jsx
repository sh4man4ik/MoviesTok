import { useEffect } from 'react';
import './navbar.css';

function Navbar() {
	useEffect(() => {
		let yearNow = new Date();
		let fullYearNow = yearNow.getFullYear() + 1;

		localStorage.setItem('minMovieYear', '1900'); //1874
		localStorage.setItem('maxMovieYear', fullYearNow);

		localStorage.setItem('minMovieRating', 1.5); //0.0
		localStorage.setItem('maxMovieRating', 8.5); //10.0

		localStorage.setItem('minMoviDuration', 80); //30
		localStorage.setItem('maxMoviDuration', 150); //240

		/*
		Action			28
		Adventure		12
		Animation		16
		Comedy			35
		Crime			80
		Drama			18
		Horror			27
		Romance			10749
		Science Fiction	878
		Thriller		53
		All Genres 		0
		*/
		localStorage.setItem('movieGenre', 0);
	}, []);

	function githubRepoLocation() {
		window.location.href = 'https://github.com/sh4man4ik/MoviesTok';
	}

	return (
		<>
			<div className="navbar">
				<h1 className="title display-6">MoviesTok</h1>
				<h1 className="github-link-text display-6" onClick={githubRepoLocation}>
					GitHub
				</h1>
				<i className="github-link-logo bi bi-github" onClick={githubRepoLocation}></i>
			</div>
		</>
	);
}

export default Navbar;
