import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useAuthorisation, useAxios } from '../../../../../../../src/hooks';
import { FormPartEdit } from '../../../../../../../src/containers';
import { genProjectMenuItems } from "../../../../../../../src/constants";
import { isUserProjectLeader } from "../../../../../../../src/utils";
import { genGetProject } from "../../../../../../../src/api";
import { Header } from "../../../../../../../src/components";

const ProjectPartUpdate = () => {
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
				subtitle="create a part"
				tabs={genProjectMenuItems(projectId)}
				tabActive="content"
				isUserLeader={isUserProjectLeader(project)}
			/>
			<FormPartEdit />
		</>
	);
};

export default ProjectPartUpdate;
