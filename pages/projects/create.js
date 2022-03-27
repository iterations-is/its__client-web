import { Header } from '../../src/components';
import { useAuthorisation } from '../../src/hooks';
import { FormCreateProject } from '../../src/containers/FormCreateProject';

const ProjectsCreate = () => {
	useAuthorisation();

	return (
		<>
			<Header title="New Project" subtitle="creation of a new project" />
			<FormCreateProject />
		</>
	);
};

export default ProjectsCreate;
