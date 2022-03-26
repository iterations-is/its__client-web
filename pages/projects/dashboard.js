import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Header, FormButton, ProjectLine } from '../../src/components';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { genGetProjectsSelf } from '../../src/api';

const ProjectsDashboard = () => {
	useAuthorisation();

	const router = useRouter();
	const { axiosAuth } = useAxios();
	const projects = useQuery('projectsSelf', genGetProjectsSelf(axiosAuth));

	const projectsList = projects?.data?.data?.payload ?? [];

	return (
		<>
			<Header
				title="User Dashboard"
				subtitle="projects created by the user and projects with contribution"
			/>
			<h2>Create a new project</h2>
			<FormButton onClick={() => router.push('/projects/create')}>Create project</FormButton>

			<h2>Last projects</h2>

			<div>
				{projectsList.map((project) => (
					<ProjectLine key={project.id} projectData={project} />
				))}
			</div>
		</>
	);
};

export default ProjectsDashboard;
