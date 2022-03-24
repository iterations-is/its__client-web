import Head from 'next/head';
import Image from 'next/image';

import logo from '../public/images/logo.svg';

const Error404 = () => (
	<>
		<Head>
			<title>Iterations</title>
		</Head>
		<Image src={logo} alt="logo" />
		<h1 className="fullscreen__title">404</h1>
		<h2 className="fullscreen__subtitle">not found</h2>
	</>
);

export default Error404;
