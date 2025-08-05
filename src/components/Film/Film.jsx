import './film.css';
import poster from '../../assets/poster.png';

function Film() {
	return (
		<>
			<div className="film-container">
				<img src={poster} alt="poster" className="film-poster" />
				<h1 className="film-title display-6">Iron Man</h1>
				<span className="film-data">
					<i className="bi bi-star-fill"></i>
					<p className="film-rating">7.9/10</p>
					<p>•</p>
					<p className="film-year">2008</p>
					<p>•</p>
					<p className="film-length">126m</p>
				</span>
				<p className="film-description">
					After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique
					weaponized suit of armor to fight evil.
				</p>
			</div>
		</>
	);
}

export default Film;
