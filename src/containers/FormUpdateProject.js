import Joi from 'joi';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAxios } from '../hooks';
import {
	genDeleteRole,
	genGetCategories,
	genGetProject,
	genPatchUpdateProject,
	genPatchUpdateRole,
	genPostCreateRole,
} from '../api';
import { restErrorToString } from '../utils';
import { Field, FormButton, Loading } from '../components';
import { queryClient } from '../query/client';
import { FaSave } from 'react-icons/fa';
import { ImBin2 } from 'react-icons/im';

const schemaRole = Joi.object({
	name: Joi.string().required(),
	capacity: Joi.number().min(0).max(999).required(),
});

const FormRole = ({ projectId, role }) => {
	const { axiosAuth } = useAxios();
	const form = useForm({ resolver: joiResolver(schemaRole) });

	const rqUpdateRole = useMutation(genPatchUpdateRole(axiosAuth, projectId, role.id), {
		onSuccess: (data) => {
			toast.success('Role was updated');
			queryClient.invalidateQueries('project' + projectId);
		},
		onError: (error) => {
			toast.error(restErrorToString(error?.response?.data));
		},
	});

	const rqDeleteRole = useMutation(genDeleteRole(axiosAuth, projectId, role.id), {
		onSuccess: (data) => {
			toast.success('Role was deleted');
			queryClient.invalidateQueries('project' + projectId);
		},
		onError: (error) => {
			toast.error(restErrorToString(error?.response?.data));
		},
	});

	const handleUpdate = (data) => {
		rqUpdateRole.mutate({ roleReq: data });
	};

	const handleDelete = () => {
		rqDeleteRole.mutate();
	};

	return (
		<form onSubmit={form.handleSubmit(handleUpdate)}>
			<div className="row">
				<div className="col d-flex align-items-center mb-2 me-1">
					<Field.Input
						name="name"
						form={form}
						type="text"
						min={0}
						max={999}
						defaultValue={role.name}
						mb=""
						className="me-1"
					/>
					<Field.Input
						name="capacity"
						form={form}
						type="number"
						defaultValue={role.capacity}
						mb=""
						className="me-1"
					/>
					<FormButton
						submit
						loading={rqUpdateRole.isLoading}
						iconOnly
						icons={[<FaSave />]}
						disabled={rqUpdateRole.isLoading}
						className="ms-1 me-1"
					/>
					<FormButton
						loading={rqDeleteRole.isLoading}
						disabled={rqDeleteRole.isLoading}
						icons={[<ImBin2 />]}
						iconOnly
						onClick={handleDelete}
					/>
				</div>
			</div>
		</form>
	);
};

const schema = Joi.object({
	name: Joi.string().min(3).required(),
	category: Joi.string().required(),
	descriptionPublic: Joi.string().allow('').required(),
	descriptionPrivate: Joi.string().allow('').required(),
	joinable: Joi.bool().required(),
	archived: Joi.bool().required(),
	searchable: Joi.bool().required(),
	public: Joi.bool().required(),
});

export const FormUpdateProject = () => {
	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();

	const [hasProject, setHasProject] = useState(false);

	const form = useForm({ resolver: joiResolver(schema) });

	const rqProject = useQuery('project' + projectId, genGetProject(axiosAuth, { projectId }), {
		enabled: projectId !== undefined,
		onSuccess: (data) => {
			const projectData = data?.data?.payload;
			if (!hasProject) {
				setHasProject(true);
				form.setValue('name', projectData.name);
				form.setValue('descriptionPublic', projectData.descriptionPublic);
				form.setValue('descriptionPrivate', projectData.descriptionPrivate);
				form.setValue('joinable', projectData.joinable);
				form.setValue('archived', projectData.archived);
				form.setValue('searchable', projectData.searchable);
				form.setValue('public', projectData.public);
				form.setValue('category', projectData.category.id);
			}
		},
	});
	const rqCategories = useQuery('categories', genGetCategories(axiosAuth));

	const rqUpdateProject = useMutation(genPatchUpdateProject(axiosAuth, projectId), {
		onSuccess: (data) => {
			toast.success('Project updated');
			queryClient.invalidateQueries('project' + projectId);
		},
		onError: (error) => {
			toast.error(restErrorToString(error?.response?.data));
		},
	});

	const rqCreateRole = useMutation(genPostCreateRole(axiosAuth, projectId), {
		onSuccess: (data) => {
			toast.success('New role was added, please update it');
			queryClient.invalidateQueries('project' + projectId);
		},
		onError: (error) => {
			toast.error(restErrorToString(error?.response?.data));
		},
	});

	const categoriesList = rqCategories.data?.data?.payload ?? [];
	const rolesList =
		rqProject.data?.data?.payload?.projectRoles?.filter(
			(role) => role.name !== 'Leader' && role.name !== 'Visitor',
		) ?? [];

	const handleUpdate = (data) => {
		rqUpdateProject.mutate({ projectReq: data });
	};

	const handleCreateRole = (data) => {
		rqCreateRole.mutate({ roleReq: { name: '-', capacity: 0 } });
	};

	if (rqCategories.isLoading || rqProject.isLoading) return <Loading />;

	return (
		<>
			<form onSubmit={form.handleSubmit(handleUpdate)}>
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
				<div className="row">
					<div className="col">
						<h3>Options</h3>
					</div>
				</div>

				<div className="row mt-4">
					<div className="col">
						<Field.Checkbox
							name="joinable"
							label="Is joinable"
							form={form}
							hint="Defines whether users can join a project on their own or not. Capacity of the each role "
						/>
						<Field.Checkbox
							name="archived"
							label="Archived"
							form={form}
							hint="Content of the archived project cannot be changed, nobody can join (but can leave). Settings of the project are available."
						/>
					</div>
					<div className="col">
						<Field.Checkbox
							name="searchable"
							label="Searchable"
							form={form}
							hint="Defines whether the project will be listed in global search."
						/>
						<Field.Checkbox
							name="public"
							label="Public"
							form={form}
							hint="Defines whether anybody can view public description and members of the team."
						/>
					</div>
				</div>
				<FormButton submit loading={rqUpdateProject.isLoading} disabled={rqUpdateProject.isLoading}>
					Update basic information
				</FormButton>
			</form>
			<div className="row mt-4">
				<div className="col">
					<h3>Roles</h3>
					<h6>Add custom roles with capacity.</h6>
					{rolesList.map((role) => (
						<FormRole key={role.id} projectId={projectId} role={role} />
					))}

					<FormButton submit={false} onClick={handleCreateRole}>
						Add role
					</FormButton>
				</div>
			</div>
		</>
	);
};
