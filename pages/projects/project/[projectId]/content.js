import { useRouter } from 'next/router';
import { Header, Loading } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetPart, genGetProject } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAxios } from '../../../../src/hooks';

const Part = ({ projectId, partId }) => {
	const { axiosAuth } = useAxios();
	const part = useQuery('part' + partId, genGetPart(axiosAuth, { projectId, partId }), {
		enabled: projectId !== undefined && partId !== undefined,
	});

	const partData = part?.data?.data?.payload;

	return (
		<div className="mb-5">
			{part.isLoading && <Loading />}
			<div>Rendered content</div>
			<pre>
				<code>{JSON.stringify(partData, null, 2)}</code>
			</pre>
		</div>
	);
};

const ProjectSettings = () => {
	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const project = useQuery('project', genGetProject(axiosAuth));

	const parts = ['1af5bc05-74f3-4435-9371-faae120dd506'];

	return (
		<>
			<Header
				title="Project name"
				subtitle="content of the project"
				tabs={genProjectMenuItems(projectId)}
				tabActive="content"
			/>

			{parts.map((partId) => (
				<Part key={partId} projectId={projectId} partId={partId} />
			))}
		</>
	);
};

export default ProjectSettings;
