import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Header, FormButton, ProjectLine, PaginationViewer } from '../../src/components';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { genGetProjectsSelf } from '../../src/api';
import { useState } from 'react';

const ProjectsDashboard = () => {
	useAuthorisation();

	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const [pageCount, setPageCount] = useState(0);

	const router = useRouter();
	const { axiosAuth } = useAxios();
	const projects = useQuery(
		['projectsSelf', page, pageSize],
		genGetProjectsSelf(axiosAuth, page, pageSize),
		{
			staleTime: 3000,
			keepPreviousData: true,
			onSuccess: (data) => {
				setPageCount(Math.ceil(data?.data?.payload?.pagination?.total / pageSize));
			},
		},
	);

	const projectsList = projects?.data?.data?.payload?.projects ?? [];

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
				<PaginationViewer totalPages={pageCount} page={page} setPage={setPage} />
			</div>
		</>
	);
};

export default ProjectsDashboard;
