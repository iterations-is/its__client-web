import Joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAxios } from '../hooks';
import { genGetInterpreters, genPostPart } from '../api';
import { Field, FormButton, TypeResolver } from "../components";
import React, { useEffect, useState } from 'react';

if (!global?.components) global.components = {};

const schema = Joi.object({
	interpreterName: Joi.string().required(),
	interpreterVersion: Joi.string().required(),
}).unknown(true);


export const FormPartCreate = () => {
	const router = useRouter();
	const { projectId } = router.query;
	const form = useForm({ resolver: joiResolver(schema) });
	const interName = form.watch('interpreterName');
	const interVersion = form.watch('interpreterVersion');
	const { axiosAuth } = useAxios();
	const [dataStructure, setDataStructure] = useState([]);

	// Get interpreters
	const rqInterpreters = useQuery('interpreters', genGetInterpreters(axiosAuth));
	const interpreters = Object.keys(rqInterpreters.data?.data?.payload ?? {}) ?? [];
	const versions = rqInterpreters.data?.data?.payload?.[interName] ?? [];
	const interpreterUrl = versions.filter((v) => v.version === interVersion)?.[0]?.url;

	// Get interpreter
	useEffect(() => {
		if (interpreterUrl) {
			(async (url) => {
				const { dataStructure, renderer } = await eval(`import("${interpreterUrl}")`);
				global.components['partCreation'] = renderer(React);
				setDataStructure(dataStructure);
			})();
		}
	}, [interpreterUrl]);

	// Part creation
	const rqCreatePart = useMutation(genPostPart(axiosAuth, { projectId }), {
		onSuccess: () => {
			toast.success('Part was created');
			router.push(`/projects/project/${projectId}/content`);
		},
	});
	const handleCreatePart = ({ interpreterName, interpreterVersion, ...rest }) => {
		rqCreatePart.mutate({ data: JSON.stringify(rest), interpreterName, interpreterVersion });
	};

	if (rqInterpreters.isLoading) return <div>Loading...</div>;

	return (
		<form onSubmit={form.handleSubmit(handleCreatePart)}>
			<div className="row">
				<div className="col">
					<Field.Select
						name="interpreterName"
						form={form}
						label="Interpreter name"
						options={interpreters.map((c) => ({ value: c, label: c }))}
						defaultValue={interpreters[0]}
					/>
				</div>
				<div className="col">
					<Field.Select
						key={interName}
						name="interpreterVersion"
						form={form}
						label="Interpreter version"
						options={versions.map((c) => ({ value: c.version, label: c.version }))}
						defaultValue={versions[0]?.version}
					/>
				</div>
			</div>

			{dataStructure.map((ds) => (
				<TypeResolver key={ds.name} form={form} fieldData={ds} />
			))}

			<FormButton submit loading={rqCreatePart.isLoading} disabled={rqCreatePart.isLoading}>
				Create
			</FormButton>
		</form>
	);
};
