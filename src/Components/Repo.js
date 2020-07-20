import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import UserFetching from '../api/UserFetchingApi';
import RepoFetching from '../api/RepoFetchingApi';
import FetchFollowers from '../api/FollowersFetchingApi';
import './Repo.css';

const GitUser = ({ match }) => {
	const { gituser, installing } = UserFetching(match.params.id);
	const { repos } = RepoFetching(gituser.repos_url);
	const { countOfFollowers } = FetchFollowers(gituser.followers_url);

	return (
		<div>
			<Link to="/" className='h5 ml-4'> <img src="https://image.flaticon.com/icons/svg/64/64817.svg" height='40px' className='mt-2' alt='back'></img></Link>

			<h1>{installing && 'LOADING'}</h1>
			<div>
				{!installing && (
					<Container className="head-container1">
						<Row className="pt-4 pb-4" style={{ backgroundColor: '#e1e1e1' }}>
							<Col>
								<Row>
									<Col md="auto">
										<img src={gituser.avatar_url} alt="Github pic" className="picture"></img>
									</Col>

									<Col>
										<h2 className="mt-4">{gituser.name}</h2>
										<h4>@{gituser.login}</h4>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<h4 className="mt-4">User-Info</h4>
								<p>{gituser.blog || '-'}</p>
								<h4>Works at</h4>
								<p>{gituser.company || '-'}</p>
								<Row>
									<Col>
										<h4>Repository</h4>
										<p>{repos.length}</p>
									</Col>
									<Col>
										<h4>Followers</h4>
										<p>{countOfFollowers}</p>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								<h3>Pinned Repositories</h3>
								{repos.map((repo, index) => {
									return (
										<div className="mt-4" key={index}>
											<Container className="repo">
												<Row className="justify-content-md-center">
													<Col md="auto">
														<img
															src={repo.owner.avatar_url}
															alt="repo"
															className="img-repo"
														></img>
													</Col>
													<Col>
														<h4>{repo.full_name}</h4>
														<p>{repo.description}</p>
													</Col>
												</Row>
											</Container>
										</div>
									);
								})}
							</Col>
						</Row>
					</Container>
				)}
			</div>
		</div>
	);
};
export default GitUser;
