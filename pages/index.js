import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/images/logo.svg';

const SignIn = () => (
	<>
		<Head>
			<title>Iterations</title>
		</Head>
		<main className="fullscreen">
			<div className="fullscreen__content">
				<Image src={logo} alt="logo" />
				<h1 className="fullscreen__title">Iterations</h1>
				<h2 className="fullscreen__subtitle">information system for project management</h2>
				<Link href="/style-guide">
					<a className="btn btn--primary">
						<span>Sign In</span>
					</a>
				</Link>
			</div>
		</main>
	</>
);

export default SignIn;
