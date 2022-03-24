import { useRouter } from 'next/router';
import { Header } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetProject } from '../../../../src/api';
import { Loading } from '../../../../src/components';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAxios } from '../../../../src/hooks';

const ProjectDescription = () => {
	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const project = useQuery('project', genGetProject(axiosAuth));

	return (
		<>
			<Header
				title="Project name"
				subtitle="basic info about the project"
				tabs={genProjectMenuItems(projectId)}
				tabActive="description"
			/>
			<h2>Public description</h2>
			<h2>Private description</h2>
		</>
	);
};

export default ProjectDescription;
