import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useAxios } from '../hooks';
import { genGetCategories } from '../api';
import { Field, Loading } from '../components';
import { debounce } from 'lodash';
import { useCallback } from 'react';

const debounceTime = 500;
const dName = debounce((sV, v) => sV(v), debounceTime);
const dCat = debounce((sV, v) => sV(v), debounceTime);

export const FormSearchProject = ({ setProjectName, setProjectCategory }) => {
	const { axiosAuth } = useAxios();
	// Name
	const setProjectNameDeb = useCallback((v) => dName(setProjectName, v), []);
	// Category
	const setProjectCategoryDeb = useCallback((v) => dCat(setProjectCategory, v), []);

	const form = useForm({
		defaultValues: {
			name: '',
		},
	});

	const handleSearch = (values) => {
		setProjectNameDeb(values.name);
		setProjectCategoryDeb(values.category);
	};

	const rqCategories = useQuery('categories', genGetCategories(axiosAuth));
	const categoriesList = rqCategories.data?.data?.payload ?? [];

	if (rqCategories.isLoading) return <Loading />;

	return (
		<form onSubmit={form.handleSubmit(handleSearch)}>
			<div className="row">
				<div className="col">
					<Field.Input
						name="name"
						form={form}
						label="Project name"
						type="text"
						onChange={(e) => {
							form.setValue('name', e.target.value);
							form.handleSubmit(handleSearch)();
						}}
					/>
				</div>
				<div className="col">
					<Field.Select
						name="category"
						form={form}
						label="Category"
						options={[
							{
								value: '',
								label: 'All',
							},
							...categoriesList.map((c) => ({ value: c.id, label: c.name })),
						]}
						defaultValue={''}
						onChange={(e) => {
							form.setValue('category', e.target.value);
							form.handleSubmit(handleSearch)();
						}}
					/>
				</div>
			</div>
		</form>
	);
};
