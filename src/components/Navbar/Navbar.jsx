import './navbar.css';

function Navbar() {
	function githubRepoLocation() {
		window.location.href = 'https://github.com/sh4man4ik/FilmsTok';
	}

	return (
		<>
			<div className="navbar">
				<h1 className="title display-6">FilmsTok</h1>
				<h1 className="github-link-text display-6" onClick={githubRepoLocation}>
					GitHub
				</h1>
				<i className="github-link-logo bi bi-github" onClick={githubRepoLocation}></i>
			</div>
		</>
	);
}

export default Navbar;
