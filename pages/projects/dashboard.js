import Link from 'next/link';
import { Header, Button, ProjectLine } from '../../src/components';
import { useAuthorisation } from '../../src/hooks/useAuthorisation';

const projects = [
	{
		id: "cff75e57-dbc0-4802-8997-c8744e4e4e0d",
		name: 'Project 1',
		category: 'Category 1',
		descriptionPublic: 'Description of project 1',
	},
	{
		id: 2,
		name: 'Project 2',
		category: 'Category 2',
		descriptionPublic: 'Description of project 2',
	},
];

const ProjectsDashboard = () => {
	useAuthorisation();

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
				{projects.map((project) => (
					<ProjectLine key={project.id} projectData={project} />
				))}
			</div>
		</>
	);
};

export default ProjectsDashboard;
