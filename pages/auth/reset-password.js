import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import logo from '../../public/images/logo.svg';
import { useAuthorisation } from '../../src/hooks';
import { Layout } from '../../src/layouts';
import { FormResetPassword } from '../../src/containers';

const ResetPassword = () => {
	useAuthorisation(false);

	return (
		<>
			<Image src={logo} alt="logo" />
			<h1 className="fullscreen__title">Iterations</h1>
			<h2 className="fullscreen__subtitle">information system for project management</h2>

			<FormResetPassword />
			<span className="mt-2 text-center">
				<Link href="/">
					<a>
						<MdOutlineKeyboardBackspace /> Sign In
					</a>
				</Link>
				{' | '}
				<Link href="/auth/sign-up">
					<a>Sign Up</a>
				</Link>
			</span>
		</>
	);
};

ResetPassword.Layout = Layout.Centered;

export default ResetPassword;
