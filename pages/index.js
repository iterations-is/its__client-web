import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../public/images/logo.svg';
import { Layout } from '../src/layouts';
import { useAuthorisation } from '../src/hooks';
import { FormSignIn } from '../src/containers';

const SignIn = () => {
	useAuthorisation(false);

	return (
		<>
			<Head>
				<title>Iterations</title>
			</Head>
			<Image src={logo} alt="logo" />
			<h1 className="fullscreen__title">Iterations</h1>
			<h2 className="fullscreen__subtitle">information system for project management</h2>

			<FormSignIn />
			<span className="mt-2 text-center">
				<Link href="/auth/sign-up">
					<a>Sign Up</a>
				</Link>
				{' | '}
				<Link href="/auth/reset-password">
					<a>Reset Password</a>
				</Link>
			</span>
		</>
	);
};

SignIn.Layout = Layout.Centered;

export default SignIn;
