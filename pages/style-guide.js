import Link from 'next/link';
import Head from 'next/head';
import { MdSync, MdTaskAlt } from 'react-icons/md';

import { Navigation, Tag } from 'src/components';
import { PROJECT_TITLE } from 'src/constants';

const StyleGuide = () => {
	return (
		<>
			<Head>
				<title>Style Guide · {PROJECT_TITLE}</title>
			</Head>
			<Navigation />
			<aside className="sidebar">
				<span className="sidebar__title">Metadata</span>
				<ul>
					<li>
						<span>Archived</span>
						<Tag>yes</Tag>
					</li>
					<li>
						<span>Content</span>
						<Tag>contributors</Tag>
					</li>
					<li>
						<span>Searchable</span>
						<Tag>yes</Tag>
					</li>
				</ul>
				<span className="sidebar__title">Vacancies</span>
				<ul>
					<li>
						<span>Archived</span>
						<Tag>yes</Tag>
					</li>
					<li>
						<span>Content</span>
						<Tag>contributors</Tag>
					</li>
					<li>
						<span>Searchable</span>
						<Tag>yes</Tag>
					</li>
				</ul>
				<span className="sidebar__title">Leaders</span>
				<ul>
					<li>
						<span>Charlotte White </span>
						<MdTaskAlt />
					</li>
					<li>
						<span>Ben Parker</span>
					</li>
				</ul>
			</aside>
			<main className="main">
				<h1>Style Guide</h1>
				<h2>Style Guide</h2>
				<h3>Style Guide</h3>
				<h4>Style Guide</h4>
				<h5>Style Guide</h5>
				<h6>Style Guide</h6>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum libero magni neque nihil
					officiis, pariatur quis recusandae soluta tempore vitae. Beatae commodi dicta laborum
					magni nam natus necessitatibus quae tempora! Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Earum libero magni neque nihil officiis, pariatur quis recusandae soluta
					tempore vitae. Beatae commodi dicta laborum magni nam natus necessitatibus quae tempora!
				</p>
				<p className="fw-bold">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum libero magni neque nihil
					officiis, pariatur quis recusandae soluta tempore vitae. Beatae commodi dicta laborum
					magni nam natus necessitatibus quae tempora! Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Earum libero magni neque nihil officiis, pariatur quis recusandae soluta
					tempore vitae. Beatae commodi dicta laborum magni nam natus necessitatibus quae tempora!
				</p>
				<p className="fw-light">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum libero magni neque nihil
					officiis, pariatur quis recusandae soluta tempore vitae. Beatae commodi dicta laborum
					magni nam natus necessitatibus quae tempora! Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Earum libero magni neque nihil officiis, pariatur quis recusandae soluta
					tempore vitae. Beatae commodi dicta laborum magni nam natus necessitatibus quae tempora!
				</p>
				<p className="fst-italic">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum libero magni neque nihil
					officiis, pariatur quis recusandae soluta tempore vitae. Beatae commodi dicta laborum
					magni nam natus necessitatibus quae tempora! Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Earum libero magni neque nihil officiis, pariatur quis recusandae soluta
					tempore vitae. Beatae commodi dicta laborum magni nam natus necessitatibus quae tempora!
				</p>
				<p className="fst-italic fw-light">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum libero magni neque nihil
					officiis, pariatur quis recusandae soluta tempore vitae. Beatae commodi dicta laborum
					magni nam natus necessitatibus quae tempora! Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Earum libero magni neque nihil officiis, pariatur quis recusandae soluta
					tempore vitae. Beatae commodi dicta laborum magni nam natus necessitatibus quae tempora!
				</p>

				<div className="container-fluid">
					<div className="row">
						<div className="col-4 mb-1">
							<Link href="/style-guide">
								<a className="btn btn--primary">
									<span>Sign In</span>
								</a>
							</Link>
						</div>
						<div className="col-4 mb-1">
							<Link href="/style-guide">
								<a className="btn btn--primary">
									<span>Sign In</span>
									<MdSync />
								</a>
							</Link>
						</div>
						<div className="col-4 mb-1">
							<Link href="/style-guide">
								<a className="btn btn--primary">
									<MdSync />
									<span>Sign In</span>
								</a>
							</Link>
						</div>
						<div className="col-4 mb-1">
							<Link href="/style-guide">
								<a className="btn btn--primary disabled">
									<span>Sign In</span>
									<MdSync />
								</a>
							</Link>
						</div>
						<div className="col-4 mb-1">
							<Link href="/style-guide">
								<a className="btn btn--primary btn--full-width">
									<span>Sign In</span>
									<MdSync />
								</a>
							</Link>
						</div>
						<div className="col-4 mb-1">
							<Link href="/style-guide">
								<a className="btn btn--primary">
									<span>Lorem ipsum dolor sit amet consectetur adipisicing</span>
									<MdSync />
								</a>
							</Link>
						</div>
						<div className="col-4 mb-1">
							<Link href="/style-guide">
								<a className="btn btn--primary btn--icon">
									<MdSync />
								</a>
							</Link>
						</div>
					</div>
				</div>

				<div className="container-fluid">
					<div className="row">
						<div className="col-4">
							<label className="field field--state-element">
								<div className="field-state-element__control switch">
									<input type="checkbox" />
									<div className="switch__inner" />
								</div>
								<span className="field-state-element__label">Lorem</span>
							</label>
						</div>
						<div className="col-4">
							<label className="field field--state-element">
								<div className="field-state-element__control switch">
									<input type="checkbox" />
									<div className="switch__inner" />
								</div>
								<span className="field-state-element__label">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum libero magni neque
									nihil officiis, pariatur quis.
								</span>
							</label>
						</div>
						<div className="col-4">
							<label className="field field--state-element">
								<div className="field-state-element__control checkbox">
									<input type="checkbox" />
									<div className="checkbox__inner" />
								</div>
								<span className="field-state-element__label">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum libero magni neque
									nihil officiis, pariatur.
								</span>
							</label>
						</div>
					</div>
				</div>

				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Handle</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td className="table-success">Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td colSpan="2">Larry the Bird</td>
								<td>@twitter</td>
							</tr>
						</tbody>
					</table>
				</div>

				<form>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
						<div id="emailHelp" className="form-text">
							We will never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">
							Password
						</label>
						<input type="password" className="form-control" id="exampleInputPassword1" />
					</div>
					<button type="submit" className="btn btn--primary">
						Submit
					</button>
				</form>
			</main>
		</>
	);
};

export default StyleGuide;
