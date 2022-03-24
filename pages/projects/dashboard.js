import Link from 'next/link';
import { Header, Button, ProjectLine } from '../../src/components';
import { useAuthorisation } from '../../src/hooks/useAuthorisation';
import { useAxios } from "../../src/hooks";
import { useQuery } from "react-query";
import { genGetProjectsSelf } from "../../src/api";

const projects = [];

const ProjectsDashboard = () => {
	useAuthorisation();

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
			<Button text="Create project" link="/projects/create" />

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
