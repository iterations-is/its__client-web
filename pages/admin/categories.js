import { Header, Loading, Field } from '../../src/components';
import { useMutation, useQuery } from 'react-query';
import {
	genDeleteCategory,
	genGetCategories,
	genPatchUpdateCategory,
	genPostCreateCategory,
} from '../../src/api';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { ImBin2 } from 'react-icons/im';
import { FaSave } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { queryClient } from '../../src/query/client';
import { IoHourglass } from 'react-icons/io5';
import { TiPlus } from 'react-icons/ti';
import { genAdminMenuItems } from "../../src/constants";

const Category = ({ id, name = '' }) => {
	const { axiosAuth } = useAxios();
	const updateCategory = useMutation(genPatchUpdateCategory(axiosAuth), {
		onSuccess: () => queryClient.invalidateQueries('categories'),
	});
	const deleteCategory = useMutation(genDeleteCategory(axiosAuth), {
		onSuccess: () => queryClient.invalidateQueries('categories'),
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const handleUpdateCategory = (values) => {
		updateCategory.mutate({
			categoryId: id,
			categoryReq: { name: values.name },
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit(handleUpdateCategory)}>
				<div className="d-flex align-items-center mb-2">
					<Field.Input
						name="name"
						type="text"
						register={register}
						errors={errors}
						defaultValue={name}
						mb=""
					/>

					<button disabled={updateCategory.isLoading} type="submit" className="btn btn-primary">
						{updateCategory.isLoading ? <IoHourglass /> : <FaSave />}
					</button>
					<button
						disabled={deleteCategory.isLoading}
						className="btn btn-primary"
						onClick={() => {
							deleteCategory.mutate(id);
						}}>
						{deleteCategory.isLoading ? <IoHourglass /> : <ImBin2 />}
					</button>
				</div>
			</form>
		</div>
	);
};

const AdminProjectCategories = () => {
	useAuthorisation();

	const { axiosAuth } = useAxios();
	const { isLoading, data } = useQuery('categories', genGetCategories(axiosAuth));

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	const createCategory = useMutation(genPostCreateCategory(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('categories');
			reset();
		},
	});
	const categories = data?.data?.payload ?? [];

	const handleCreateCategory = (values) => {
		createCategory.mutate({
			categoryReq: { name: values.name },
		});
	};

	return (
		<>
			<Header
				title="Administration Panel"
				subtitle="tools for geeks"
				tabs={genAdminMenuItems()}
				tabActive="categories"
			/>

			<h2>Create a category</h2>

			<form onSubmit={handleSubmit(handleCreateCategory)}>
				<div className="d-flex align-items-center">
					<Field.Input name="name" type="text" register={register} errors={errors} mb="" />
					<button type="submit" className="btn btn-primary" disabled={createCategory.isLoading}>
						{createCategory.isLoading ? <IoHourglass /> : <TiPlus />}
					</button>
				</div>
			</form>

			<h2>Categories</h2>
			{isLoading && <Loading />}
			{categories.map((category) => (
				<Category key={category.id} {...category} />
			))}
		</>
	);
};

export default AdminProjectCategories;
