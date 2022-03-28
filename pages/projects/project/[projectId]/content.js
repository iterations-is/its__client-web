import { useRouter } from 'next/router';
import { Header, Loading } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetPart, genGetProject } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAuthorisation, useAxios } from '../../../../src/hooks';
import { isUserProjectLeader } from "../../../../src/utils";

const Part = ({ projectId, partId }) => {
	const { axiosAuth } = useAxios();
	const part = useQuery('part' + partId, genGetPart(axiosAuth, { projectId, partId }), {
		enabled: projectId !== undefined && partId !== undefined,
	});

	const partData = part?.data?.data?.payload;

	return (
		<div className="mb-5">
			{part.isLoading && <Loading />}
			<div>Rendered content</div>
			<pre>
				<code>{JSON.stringify(partData, null, 2)}</code>
			</pre>
		</div>
	);
};

const ProjectSettings = () => {
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
		</>
	);
};

export default ProjectSettings;
