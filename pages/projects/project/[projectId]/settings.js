import { useRouter } from 'next/router';
import { Header } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetProject } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAuthorisation, useAxios } from '../../../../src/hooks';
import { FormUpdateProject, ProjectSidebar } from '../../../../src/containers';
import { isUserProjectLeader } from '../../../../src/utils';

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
				title={project.data?.data?.payload?.name ?? '-'}
				subtitle="settings of the project"
				tabs={genProjectMenuItems(projectId)}
				tabActive="settings"
				isUserLeader={isUserProjectLeader(project)}
			/>
			<FormUpdateProject />
		</>
	);
};

ProjectSettings.Sidebar = ProjectSidebar;

export default ProjectSettings;
