import Joi from 'joi';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAxios } from '../hooks';
import { genGetCategories, genPostCreateProject } from '../api';
import { restErrorToString } from '../utils';
import { Field, FormButton, Loading } from '../components';
import { Wrapper } from '../components/Field/Wrapper';
import { ImBin2 } from 'react-icons/im';

const schema = Joi.object({
	name: Joi.string().min(3).required(),
	category: Joi.string().required(),
	descriptionPublic: Joi.string().allow('').required(),
	descriptionPrivate: Joi.string().allow('').required(),
	joinable: Joi.bool().required(),
	archived: Joi.bool().required(),
	searchable: Joi.bool().required(),
	public: Joi.bool().required(),
	roles: Joi.array().items(
		Joi.object().keys({
			name: Joi.string().required(),
			capacity: Joi.number().min(0).max(999).required(),
		}),
	),
});

export const FormCreateProject = () => {
	const router = useRouter();
	const form = useForm({ resolver: joiResolver(schema) });
	const formArrayRoles = useFieldArray({
		control: form.control,
		name: 'roles',
	});
	const { axiosAuth } = useAxios();

	const rqCategories = useQuery('categories', genGetCategories(axiosAuth));

	const rqCreateProject = useMutation(genPostCreateProject(axiosAuth), {
		onSuccess: (data) => {
			const projectId = data?.data?.payload?.project?.id;
			router.push(`/projects/project/${projectId}/description`);
		},
		onError: (error) => {
			toast.error(restErrorToString(error?.response?.data));
		},
	});

	const handleCreationSubmit = (data) => {
		rqCreateProject.mutate({ projectReq: data });
	};

	const categoriesList = rqCategories.data?.data?.payload ?? [];

	if (rqCategories.isLoading) return <Loading />;

	return (
		<form onSubmit={form.handleSubmit(handleCreationSubmit)}>
			<div className="row">
				<div className="col">
					<h3>Basic information</h3>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<Field.Input
						name="name"
						form={form}
						label="Project name"
						type="text"
						hint="It is better to choose something unique."
					/>
				</div>
				<div className="col">
					<Field.Select
						name="category"
						form={form}
						label="Category"
						options={categoriesList.map((c) => ({ value: c.id, label: c.name }))}
						defaultValue={categoriesList[0].id}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col">
					<Field.TextArea
						name="descriptionPublic"
						label="Public description"
						form={form}
						hint="Public description will be visible for everyone if the project is public (see Options)."
					/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<Field.TextArea
						name="descriptionPrivate"
						label="Private description"
						form={form}
						hint="Private description is visible only for members of the project. I.e. for Leaders, special roles (see Roles) and Visitor role."
					/>
				</div>
			</div>

			<div className="row mt-4">
				<div className="col">
					<h3>Roles</h3>
          <h6>Add custom roles with capacity.</h6>
					{formArrayRoles.fields.map((role, index) => (
						<div className="d-flex">
							<Wrapper
								className="flex-grow-1 me-1"
								errorCustom={form.formState?.errors?.roles?.[index]?.name}>
								<input
									type="text"
									{...form.register(`roles.${index}.name`)}
									className="form-control"
								/>
							</Wrapper>
							<Wrapper
								className="flex-grow-1 me-1"
								errorCustom={form.formState?.errors?.roles?.[index]?.capacity}>
								<input
									type="number"
									min={0}
									max={999}
									{...form.register(`roles.${index}.capacity`)}
									className="form-control"
								/>
							</Wrapper>
							<FormButton onClick={() => formArrayRoles.remove(index)}>
								<ImBin2 />
							</FormButton>
						</div>
					))}
					<FormButton
						submit={false}
						onClick={() => formArrayRoles.append({ name: '', capacity: 0 })}>
						Add role
					</FormButton>
				</div>
				<div className="col">
					<h3>Options</h3>
					<Field.Checkbox
						name="joinable"
						label="Is joinable"
						form={form}
						defaultChecked
						hint="Defines whether users can join a project on their own or not. Capacity of the each role "
					/>
					<Field.Checkbox
						name="archived"
						label="Archived"
						form={form}
						hint="Content of the archived project cannot be changed, nobody can join (but can leave). Settings of the project are available."
					/>
					<Field.Checkbox
						name="searchable"
						label="Searchable"
						form={form}
						defaultChecked
						hint="Defines whether the project will be listed in global search."
					/>
					<Field.Checkbox
						name="public"
						label="Public"
						form={form}
						defaultChecked
						hint="Defines whether anybody can view public description and members of the team."
					/>
				</div>
			</div>
			<FormButton submit loading={rqCreateProject.isLoading} disabled={rqCreateProject.isLoading}>
				Create project
			</FormButton>
		</form>
	);
};
