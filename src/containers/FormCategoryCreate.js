import Joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAxios } from '../hooks';
import { genPostCreateCategory } from '../api';
import { Field, FormButton } from '../components';
import { queryClient } from '../query/client';

const schema = Joi.object({
	name: Joi.string().required(),
});

export const FormCategoryCreate = ({ id, categoryName }) => {
	const router = useRouter();
	const form = useForm({ resolver: joiResolver(schema) });
	const { axiosAuth } = useAxios();

	const rqCreateCategory = useMutation(genPostCreateCategory(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('categories');
			toast.success('Category was created');
			form.reset();
		},
	});

	const handleCreateCategory = (values) => {
		rqCreateCategory.mutate({
			categoryReq: { name: values.name },
		});
	};

	return (
		<form onSubmit={form.handleSubmit(handleCreateCategory)}>
			<div className="d-flex align-items-center mb-2">
				<Field.Input name="name" type="text" form={form} defaultValue={categoryName} mb="" />
				<FormButton
					submit
					loading={rqCreateCategory.isLoading}
					disabled={rqCreateCategory.isLoading}
					className="ms-1">
					Create
				</FormButton>
			</div>
		</form>
	);
};
