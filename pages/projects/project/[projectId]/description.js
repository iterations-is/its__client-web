import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import { Header } from '../../../../src/components';
import { genGetProject } from '../../../../src/api';
import { Loading } from '../../../../src/components';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAxios } from '../../../../src/hooks';

const ProjectDescription = () => {
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
				subtitle="basic info about the project"
				tabs={genProjectMenuItems(projectId)}
				tabActive="description"
			/>
			<h2>Public description</h2>
			{project.isLoading ? (
				<Loading />
			) : (
				<div>
					<ReactMarkdown>{project.data?.data?.payload?.descriptionPublic}</ReactMarkdown>
				</div>
			)}
			<h2 className="mt-5">Private description</h2>
			{project.isLoading ? (
				<Loading />
			) : (
				<div>
					<ReactMarkdown>{project.data?.data?.payload?.descriptionPrivate}</ReactMarkdown>
				</div>
			)}
		</>
	);
};

export default ProjectDescription;
