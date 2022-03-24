import { Header } from '../../src/components';
import { useAuthorisation } from '../../src/hooks/useAuthorisation';

const ProjectsSearch = () => {
	useAuthorisation();

	return (
		<>
			<Header
				title="Search"
				subtitle="a list of the projects with and option to find by specific parameters"
			/>
			Find projects
		</>
	);
};

export default ProjectsSearch;
