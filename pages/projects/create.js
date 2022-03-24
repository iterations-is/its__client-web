import { Header, Field, Loading } from '../../src/components';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { genGetCategories, genPostCreateProject } from '../../src/api';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { useRouter } from 'next/router';

const ProjectsCreate = () => {
	useAuthorisation();
	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const { axiosAuth } = useAxios();
	const qCategories = useQuery('categories', genGetCategories(axiosAuth));
	const categoriesList = qCategories.data?.data?.payload ?? [];

	const createProject = useMutation(genPostCreateProject(axiosAuth), {
		onSuccess: (data) => {
			const projectId = data?.data?.payload?.project?.id;
			router.push(`/projects/project/${projectId}/description`);
		},
	});

	const handleCreationSubmit = async (data) => {
		console.log('data', data);
		const a = await createProject.mutate({ projectReq: data });
		console.log(`a`, a);
	};

	if (qCategories.isLoading) return <Loading />;

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
							options={categoriesList.map((c) => ({ value: c.id, label: c.name }))}
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
						<Field.Checkbox
							name="joinable"
							label="Is joinable"
							register={register}
							errors={errors}
							defaultChecked
						/>
					</div>
					<div className="col">
						<Field.Checkbox name="archived" label="Archived" register={register} errors={errors} />
					</div>
					<div className="col">
						<Field.Checkbox
							name="searchable"
							label="Searchable"
							register={register}
							errors={errors}
							defaultChecked
						/>
					</div>
					<div className="col">
						<Field.Checkbox
							name="public"
							label="Public"
							register={register}
							errors={errors}
							defaultChecked
						/>
					</div>
				</div>

				<button className="btn btn-primary" type="submit">
					Save
				</button>
			</form>
		</>
	);
};

export default ProjectsCreate;
