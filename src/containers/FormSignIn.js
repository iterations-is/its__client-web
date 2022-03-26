import Joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { saveCredentialsFromResponse, useAxios } from '../hooks';
import { genPostSignIn } from '../api';
import { restErrorToString } from '../utils';
import { Field, FormButton } from '../components';

const schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().min(1).required(),
});

export const FormSignIn = () => {
	const router = useRouter();
	const form = useForm({ resolver: joiResolver(schema) });
	const { axiosUnAuth } = useAxios();

	const rqSignIn = useMutation(genPostSignIn(axiosUnAuth), {
		onSuccess: (data) => {
			saveCredentialsFromResponse(data?.data?.payload);
			const myParam = new URLSearchParams(window.location.search).get('callback');
			router.push(myParam ?? '/projects/dashboard');
		},
		onError: (error) => {
			toast.error(restErrorToString(error?.response?.data));
		},
	});

	const handleSignIn = (data) => {
		rqSignIn.mutate({ authReq: data });
	};

	return (
		<form onSubmit={form.handleSubmit(handleSignIn)}>
			<Field.Input name="username" form={form} placeholder="Username" type="text" />
			<Field.Input name="password" form={form} placeholder="Password" type="password" />
			<FormButton submit loading={rqSignIn.isLoading} disabled={rqSignIn.isLoading} full>
				Sign In
			</FormButton>
		</form>
	);
};
