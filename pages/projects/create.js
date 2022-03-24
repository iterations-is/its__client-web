import { Header, Field } from '../../src/components';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { genGetCategories } from '../../src/api';
import { useAuthorisation, useAxios } from '../../src/hooks';

const ProjectsCreate = () => {
	useAuthorisation();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const { axiosAuth } = useAxios();
	const { isLoading, data } = useQuery('categories', genGetCategories(axiosAuth));

	const handleCreationSubmit = (data) => {
		console.log(data);
	};

	return (
		<>
			<Header title="New Project" subtitle="creation of a new project" />
			<form onSubmit={handleSubmit(handleCreationSubmit)}>
				<div className="row">
					<div className="col">
						<Field.Input
							name="name"
							label="Project name"
							type="text"
							register={register}
							errors={errors}
						/>
					</div>
					<div className="col">
						<Field.Select
							name="category"
							label="Category"
							options={[
								{ value: '1', label: 'Category 1' },
								{ value: '2', label: 'Category 2' },
								{ value: '3', label: 'Category 3' },
							]}
							register={register}
							errors={errors}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<Field.TextArea
							name="descriptionPrivate"
							label="Private description"
							register={register}
							errors={errors}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<Field.TextArea
							name="descriptionPublic"
							label="Public description"
							register={register}
							errors={errors}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default ProjectsCreate;
