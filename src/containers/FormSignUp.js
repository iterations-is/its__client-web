import Joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { saveCredentialsFromResponse, useAxios } from '../hooks';
import { genPostSignUp } from '../api';
import { Field, FormButton } from '../components';
import { restErrorToString } from "../utils";

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	name: Joi.string().required(),
	username: Joi.string().required(),
	password: Joi.string().min(2).required(),
});

export const FormSignUp = () => {
	const router = useRouter();
	const form = useForm({ resolver: joiResolver(schema) });
	const { axiosUnAuth } = useAxios();

	const rqSignUp = useMutation(genPostSignUp(axiosUnAuth), {
		onSuccess: (data) => {
			saveCredentialsFromResponse(data?.data?.payload);
			router.push('/projects/dashboard');
		},
		onError: (error) => {
			toast.error(restErrorToString(error?.response?.data));
		},
	});

	const handleSignUp = (data) => {
		rqSignUp.mutate({ authReq: data });
	};

	return (
		<form onSubmit={form.handleSubmit(handleSignUp)}>
			<Field.Input name="name" form={form} placeholder="Name" type="text" />
			<Field.Input name="username" form={form} placeholder="Username" type="text" />
			<Field.Input name="email" form={form} placeholder="E-mail" type="text" />
			<Field.Input name="password" form={form} placeholder="Password" type="password" />
			<FormButton submit loading={rqSignUp.isLoading} disabled={rqSignUp.isLoading} full>
				Sign Up
			</FormButton>
		</form>
	);
};
