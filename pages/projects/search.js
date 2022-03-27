import { Header, Loading, PaginationViewer, ProjectLine } from '../../src/components';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { useQuery } from 'react-query';
import { genGetProjects } from '../../src/api';
import { useState } from 'react';

const ProjectsSearch = () => {
	useAuthorisation();

	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const [pageCount, setPageCount] = useState(0);

	const { axiosAuth } = useAxios();
	const projects = useQuery(
		['projects', page, pageSize],
		genGetProjects(axiosAuth, page, pageSize),
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
				title="Search"
				subtitle="a list of the projects with and option to find by specific parameters"
			/>
			{projects.isLoading && <Loading />}

			{projectsList.map((project) => (
				<ProjectLine key={project.id} projectData={project} />
			))}
			<PaginationViewer totalPages={pageCount} page={page} setPage={setPage} />
		</>
	);
};

export default ProjectsSearch;
