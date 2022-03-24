import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import logo from '../public/images/logo.svg';
import { Layout } from '../src/layouts';
import { Field } from '../src/components';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { genPostSignIn } from '../src/api';
import { saveCredentialsFromResponse, useAxios } from '../src/hooks';

const SignIn = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const { axiosUnauth } = useAxios();

	const signIn = useMutation(
		(values) =>
			axiosUnauth('/auth-service/signin', {
				method: 'POST',
				data: values,
			}),
		{
			onSuccess: (data, variables) => {
				saveCredentialsFromResponse(data?.data?.payload);

				const urlParams = new URLSearchParams(window.location.search);
				const myParam = urlParams.get('callback');

				router.push(myParam ?? '/projects/dashboard');
			},
		},
	);

	const handleSignIn = (data) => {
		console.log(`data,`, data);
		signIn.mutate(data);
	};

	return (
		<>
			<Head>
				<title>Iterations</title>
			</Head>
			<Image src={logo} alt="logo" />
			<h1 className="fullscreen__title">Iterations</h1>
			<h2 className="fullscreen__subtitle">information system for project management</h2>

			<form onSubmit={handleSubmit(handleSignIn)}>
				<Field.Input
					name="username"
					placeholder="Username"
					type="text"
					register={register}
					errors={errors}
					mb={'mb-2'}
				/>
				<Field.Input
					name="password"
					placeholder="Password"
					type="password"
					register={register}
					errors={errors}
					mb={'mb-2'}
				/>
				<input type="submit" className="btn btn--primary btn--full-width" value="Sign In" />
			</form>
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
