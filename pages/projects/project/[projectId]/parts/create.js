import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { genProjectMenuItems } from '../../../../../src/constants';
import { isUserProjectLeader } from '../../../../../src/utils';
import { Header } from '../../../../../src/components';
import { genGetProject } from '../../../../../src/api';
import { useAuthorisation, useAxios } from '../../../../../src/hooks';
import { FormPartCreate } from '../../../../../src/containers';

const ProjectPartCreation = () => {
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
				subtitle="create a part"
				tabs={genProjectMenuItems(projectId)}
				tabActive="content"
				isUserLeader={isUserProjectLeader(project)}
			/>
			<FormPartCreate />
		</>
	);
};

export default ProjectPartCreation;
