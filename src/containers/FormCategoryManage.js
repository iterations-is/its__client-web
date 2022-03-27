import Joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAxios } from '../hooks';
import { genDeleteCategory, genPatchUpdateCategory } from '../api';
import { Field, FormButton } from '../components';
import { queryClient } from '../query/client';
import { ImBin2 } from 'react-icons/im';
import { FaSave } from 'react-icons/fa';

const schema = Joi.object({
	name: Joi.string().required(),
});

export const FormCategoryManage = ({ id, categoryName }) => {
	const router = useRouter();
	const form = useForm({ resolver: joiResolver(schema) });
	const { axiosAuth } = useAxios();

	const rqUpdateCategory = useMutation(genPatchUpdateCategory(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('categories');
			toast.success('Category was updated');
		},
	});
	const rqDeleteCategory = useMutation(genDeleteCategory(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('categories');
			toast.success('Category was deleted');
		},
		onError: (data) => {
			if (data.response?.data?.code === 'CATEGORY_HAS_PROJECTS') {
				toast.error('Category has projects and cannot be deleted');
				return;
			}

			toast.error('Category was not deleted');
		},
	});

	const handleUpdateCategory = (values) => {
		rqUpdateCategory.mutate({
			categoryId: id,
			categoryReq: { name: values.name },
		});
	};

	const handleDeleteCategory = () => {
		rqDeleteCategory.mutate(id);
	};

	return (
		<form onSubmit={form.handleSubmit(handleUpdateCategory)}>
			<div className="d-flex align-items-center mb-2 me-1">
				<Field.Input name="name" type="text" form={form} defaultValue={categoryName} mb="" />
				<FormButton
					submit
					loading={rqUpdateCategory.isLoading}
					iconOnly
					icons={[<FaSave />]}
					disabled={rqUpdateCategory.isLoading}
					className="ms-1 me-1"
				/>
				<FormButton
					loading={rqDeleteCategory.isLoading}
					disabled={rqDeleteCategory.isLoading}
					icons={[<ImBin2 />]}
					iconOnly
					onClick={handleDeleteCategory}
				/>
			</div>
		</form>
	);
};
