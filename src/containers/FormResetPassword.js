import Joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAxios } from '../hooks';
import { genPostResetPassword } from '../api';
import { Field, FormButton } from '../components';
import { restErrorToString } from '../utils';

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
});

export const FormResetPassword = () => {
	const router = useRouter();
	const form = useForm({ resolver: joiResolver(schema) });
	const { axiosUnAuth } = useAxios();

	const rqResetPassword = useMutation(genPostResetPassword(axiosUnAuth), {
		onSuccess: (data) => {
			toast.success('Check your email');
			router.push('/');
		},
		onError: (error) => {
			toast.error(restErrorToString(error));
		},
	});

	const handleSignUp = (data) => {
		rqResetPassword.mutate({ authReq: data });
	};

	return (
		<form onSubmit={form.handleSubmit(handleSignUp)}>
			<Field.Input name="email" form={form} placeholder="E-mail" type="text" />
			<FormButton
				submit
				loading={rqResetPassword.isLoading}
				disabled={rqResetPassword.isLoading}
				full>
				Reset password
			</FormButton>
		</form>
	);
};
