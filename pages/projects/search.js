import { Header, Loading, ProjectLine } from '../../src/components';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { useQuery } from 'react-query';
import { genGetProjects } from '../../src/api';

const ProjectsSearch = () => {
	useAuthorisation();

	const { axiosAuth } = useAxios();
	const projects = useQuery('projects', genGetProjects(axiosAuth));

	const projectsList = projects?.data?.data?.payload ?? [];

	return (
		<>
			<Header
				title="Search"
				subtitle="a list of the projects with and option to find by specific parameters"
			/>
			{projects.isLoading && <Loading />}

			{projectsList.map((project) => (
				<ProjectLine key={project.id} projectData={project} />
			))}
		</>
	);
};

export default ProjectsSearch;
