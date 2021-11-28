import Head from 'next/head';
import Image from 'next/image';

import logo from '../public/images/logo.svg';

const Error404 = () => (
	<>
		<Head>
			<title>Iterations</title>
		</Head>
		<main className="fullscreen">
			<div className="fullscreen__content">
				<Image src={logo} alt="logo" />
				<h1 className="fullscreen__title">404</h1>
				<h2 className="fullscreen__subtitle">not found</h2>
			</div>
		</main>
	</>
);

export default Error404;
