import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { Layout } from '../../src/layouts';
import { useAuthorisation } from '../../src/hooks';
import logo from '../../public/images/logo.svg';
import { FormSignUp } from '../../src/containers';

const SignUp = () => {
	useAuthorisation(false);

	return (
		<>
			<Image src={logo} alt="logo" />
			<h1 className="fullscreen__title">Iterations</h1>
			<h2 className="fullscreen__subtitle">information system for project management</h2>

			<FormSignUp />
			<span className="mt-2 text-center">
				<Link href="/">
					<a>
						<MdOutlineKeyboardBackspace /> Sign In
					</a>
				</Link>
				{' | '}
				<Link href="/auth/reset-password">
					<a>Reset Password</a>
				</Link>
			</span>
		</>
	);
};

SignUp.Layout = Layout.Centered;

export default SignUp;
