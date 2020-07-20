import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataFetching from '../api/DataFetchingApi';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

const Home = () => {
	const [statement, setStatement] = useState('');
	const [count, setCount] = useState(1);

	
	const { installing, githubs, hasMore } = DataFetching(statement, count);

	const details = useRef();
	const lastGithubref = useCallback(
		(node) => {
			if (installing) return;
			if (details.current) details.current.disconnect();
			details.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setCount((prevCount) => prevCount + 1);
				}
			});
			if (node) details.current.observe(node);
		},
		[installing, hasMore]
	);

	function handles(e) {
		setStatement(e.target.value);
		setCount(1);
	}

	return (
		<div className="App">
			<div className='header-container1'>
					<div className='header'>
						<img
							src="https://image.flaticon.com/icons/svg/733/733553.svg"
							alt="Github logo"
							height="50px"
							width="50px"
						></img>
				
						<h2 className='mt-2 ml-1'>Github Profile Viewer</h2>
					</div>
				
				
					<div>
						<input
							className="search-bar"
							placeholder="Search for user"
							type="text"
							value={statement}
							onChange={handles}
						></input>
					</div>
				
				
						<Container fluid>
							<Row className="justify-content-md-center">
								{githubs.map((github, index) => {
									if (githubs.length === index + 1)
										return (
											<Link ref={lastGithubref} to={`/${github.id}`} key={index}>
												<Col md="12" className="github">
													<Row>
														<Col md="auto" xs="auto">
															<img
																src={github.avatar_url}
																alt="repo"
																className="git-img"
															></img>
														</Col>
														<Col md="auto" xs="auto">
															<h4 className='mt-4'>{github.login}</h4>
														</Col>
													</Row>
												</Col>
											</Link>
										);
									else {
										return (
											<Link to={`/${github.id}`} key={index}>
												<Col md="12" className="github">
													<Row>
														<Col md="auto" xs="auto">
															<img
																src={github.avatar_url}
																alt="repo"
																className="git-img"
															></img>
														</Col>
														<Col md="auto" xs="auto">
															<h4 className='mt-4'>{github.login}</h4>
														</Col>
													</Row>
												</Col>
											</Link>
										);
									}
								})}
							</Row>
						</Container>
			</div>
			<div>{!installing && 'loading..'}</div>
		</div>
	);
};

export default Home;
