import { Layout } from '../../src/layouts';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import Link from 'next/link';

const ResetPassword = () => (
	<>
		<p>Enter your email address and we'll send you a new password.</p>
		<form>
			<label>
				E-mail
				<input type="text" />
			</label>
			<label>
				<input type="submit" value="Send" />
			</label>
		</form>
		<Link href="/">
			<a>
				<MdOutlineKeyboardBackspace />
				Sign In
			</a>
		</Link>
	</>
);

ResetPassword.Layout = Layout.Centered;

export default ResetPassword;
