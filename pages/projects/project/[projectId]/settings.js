import { useRouter } from 'next/router';
import { Header } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetProject } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAuthorisation, useAxios } from '../../../../src/hooks';

const ProjectSettings = () => {
	useAuthorisation();

	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const project = useQuery('project' + projectId, genGetProject(axiosAuth, { projectId }), {
		enabled: projectId !== undefined,
	});

	return (
		<>
			<Header
				title="Project name"
				subtitle="settings of the project"
				tabs={genProjectMenuItems(projectId)}
				tabActive="settings"
			/>
			<h2>Set</h2>
		</>
	);
};

export default ProjectSettings;
