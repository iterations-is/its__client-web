import { useRouter } from 'next/router';
import { FormButton, Header, Loading } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetInterpreter, genGetPart, genGetProject } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAuthorisation, useAxios } from '../../../../src/hooks';
import { isUserProjectLeader } from '../../../../src/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { MdEdit, MdPostAdd } from 'react-icons/md';
import { ImBin2 } from 'react-icons/im';

if (!global?.components) global.components = {};

const Part = ({ projectId, partId }) => {
	const router = useRouter();
	const { axiosAuth } = useAxios();

	const [partData, setPartData] = useState(null);
	const [isRendererLoaded, setIsRendererLoaded] = useState(false);

	// Get part data
	const rqPart = useQuery(['part', partId], genGetPart(axiosAuth, { projectId, partId }), {
		enabled: projectId !== undefined && partId !== undefined,
		onSuccess: (data) => setPartData(data?.data?.payload),
	});
	const partSha = partData?.sha;
	const partContent = useMemo(() => JSON.parse(partData?.decodedContent ?? '{}'), [partData]);
	const partIntName = partData?.meta?.interpreterName;
	const partIntVersion = partData?.meta?.interpreterVersion;

	// Get interpreter data
	const rqInterpreter = useQuery(
		['interpreter', partIntName, partIntVersion],
		genGetInterpreter(axiosAuth, { name: partIntName, version: partIntVersion }),
		{
			enabled: partIntName !== undefined && partIntVersion !== undefined,
		},
	);
	const interpreterUrl = rqInterpreter?.data?.data?.payload?.url;

	useEffect(() => {
		if (interpreterUrl) {
			(async (url) => {
				const { dataStructure, renderer } = await eval(`import("${interpreterUrl}")`);
				global.components[partId] = renderer(React);
				setIsRendererLoaded(true);
			})();
		}
	}, [interpreterUrl, partId]);

	const Comp = global?.components?.[partId];

	if (rqPart.isLoading || rqInterpreter.isLoading || !isRendererLoaded) return <Loading />;

	return (
		<div className="row mb-5">
			<div className="col flex-grow-1">{Comp && <Comp {...partContent} />}</div>
			<div className="col flex-grow-0 flex-column">
				<FormButton
					icons={[<MdEdit key="ri" />]}
					iconOnly={true}
					onClick={() =>
						router.push(`/projects/project/${projectId}/parts/${partId}/${partSha}/edit`)
					}
					className="mb-1"
				/>
				{/*<FormButton*/}
				{/*	icons={[<ImBin2 key="ri" />]}*/}
				{/*	iconOnly={true}*/}
				{/*	onClick={() => router.push(`/projects/project/${projectId}/parts/create`)}*/}
				{/*/>*/}
			</div>
		</div>
	);
};

const ProjectContent = () => {
	useAuthorisation();

	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const project = useQuery('project' + projectId, genGetProject(axiosAuth, { projectId }), {
		enabled: projectId !== undefined,
	});

	const parts = project?.data?.data?.payload?.projectParts ?? [];

	return (
		<>
			<Header
				title={project.data?.data?.payload?.name ?? '-'}
				subtitle="content of the project"
				tabs={genProjectMenuItems(projectId)}
				tabActive="content"
				isUserLeader={isUserProjectLeader(project)}
			/>
			{parts.map(({ id }) => (
				<Part key={id} projectId={projectId} partId={id} />
			))}

			<div className="text-center">
				<FormButton
					icons={[undefined, <MdPostAdd key="ri" />]}
					onClick={() => router.push(`/projects/project/${projectId}/parts/create`)}>
					Create a part
				</FormButton>
			</div>
		</>
	);
};

export default ProjectContent;
