import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useQuery } from 'react-query';
import { Header } from '../../../../src/components';
import { genGetProject } from '../../../../src/api';
import { Loading } from '../../../../src/components';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAuthorisation, useAxios } from '../../../../src/hooks';
import { ProjectSidebar } from '../../../../src/containers';
import { isUserProjectLeader } from '../../../../src/utils';

const ProjectDescription = () => {
	useAuthorisation();

	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const project = useQuery('project' + projectId, genGetProject(axiosAuth, { projectId }), {
		enabled: projectId !== undefined,
	});

	const descPublic = project.data?.data?.payload?.descriptionPublic;
	const descPrivate = project.data?.data?.payload?.descriptionPrivate;

	return (
		<>
			<Header
				title={project.data?.data?.payload?.name ?? '-'}
				subtitle="basic info about the project"
				tabs={genProjectMenuItems(projectId)}
				tabActive="description"
				isUserLeader={isUserProjectLeader(project)}
			/>
			<h2>Public description</h2>
			{project.isLoading ? (
				<Loading />
			) : (
				<div>
					{descPublic && <ReactMarkdown>{descPublic}</ReactMarkdown>}
					{!descPublic && <p>No public description</p>}
				</div>
			)}
			<h2 className="mt-5">Private description</h2>
			{project.isLoading ? (
				<Loading />
			) : (
				<>
					{descPrivate && <ReactMarkdown>{descPrivate}</ReactMarkdown>}
					{!descPrivate && <p>No public description</p>}
				</>
			)}
		</>
	);
};

ProjectDescription.Sidebar = ProjectSidebar;

export default ProjectDescription;
