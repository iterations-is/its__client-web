import Joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAxios } from '../hooks';
import { genGetInterpreters, genGetPart, genPatchPart, genPostPart } from '../api';
import { Field, FormButton, TypeResolver } from '../components';
import React, { useEffect, useMemo, useState } from 'react';

if (!global?.components) global.components = {};

const schema = Joi.object({
	interpreterName: Joi.string().required(),
	interpreterVersion: Joi.string().required(),
}).unknown(true);

export const FormPartEdit = () => {
	const router = useRouter();
	const { projectId, partId, sha } = router.query;
	const form = useForm({ resolver: joiResolver(schema) });
	const interName = form.watch('interpreterName');
	const interVersion = form.watch('interpreterVersion');
	const { axiosAuth } = useAxios();
	const [dataStructure, setDataStructure] = useState([]);

	// Get part
	const rqPart = useQuery(['part', partId], genGetPart(axiosAuth, { projectId, partId }), {
		enabled: projectId !== undefined && partId !== undefined,
		onSuccess: (data) => {
			const partData = data?.data?.payload ?? {};
			const partSha = partData?.sha;
			const partIntName = partData?.meta?.interpreterName;
			const partIntVersion = partData?.meta?.interpreterVersion;
			form.setValue('interpreterName', partIntName);
			form.setValue('interpreterVersion', partIntVersion);
			const partContent = JSON.parse(partData?.decodedContent);
			Object.keys(partContent).forEach((key) => {
				form.setValue(key, partContent[key]);
			});
		},
	});
	const partData = rqPart?.data?.data?.payload ?? {};
	const partSha = partData?.sha;
	const partContent = useMemo(() => JSON.parse(partData?.decodedContent ?? '{}'), [partData]);
	const partIntName = partData?.meta?.interpreterName;
	const partIntVersion = partData?.meta?.interpreterVersion;

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
	const rqUpdatePart = useMutation(genPatchPart(axiosAuth, { projectId, partId }), {
		onSuccess: () => {
			toast.success('Part was updated');
			router.push(`/projects/project/${projectId}/content`);
		},
	});
	const handleCreatePart = ({ interpreterName, interpreterVersion, ...rest }) => {
		rqUpdatePart.mutate({
			sha: sha,
			data: JSON.stringify(rest),
			interpreterName,
			interpreterVersion,
		});
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
						defaultValue={partIntName}
					/>
				</div>
				<div className="col">
					<Field.Select
						key={interName}
						name="interpreterVersion"
						form={form}
						label="Interpreter version"
						options={versions.map((c) => ({ value: c.version, label: c.version }))}
						defaultValue={partIntVersion}
					/>
				</div>
			</div>

			{dataStructure.map((ds) => (
				<TypeResolver key={ds.name} form={form} fieldData={ds} />
			))}

			<FormButton submit loading={rqUpdatePart.isLoading} disabled={rqUpdatePart.isLoading}>
				Save
			</FormButton>
		</form>
	);
};
