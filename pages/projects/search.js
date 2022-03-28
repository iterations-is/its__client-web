import { Header, Loading, PaginationViewer, ProjectLine } from '../../src/components';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { useQuery } from 'react-query';
import { genGetProjects } from '../../src/api';
import { useState } from 'react';
import { FaArchive, FaUserPlus } from 'react-icons/fa';
import { FormSearchProject } from '../../src/containers';

const ProjectsSearch = () => {
	useAuthorisation();

	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const [pageCount, setPageCount] = useState(0);

	const [projectName, setProjectName] = useState('');
	const [projectCategory, setProjectCategory] = useState('');

	const { axiosAuth } = useAxios();
	const projects = useQuery(
		['projects', page, pageSize, projectName, projectCategory],
		genGetProjects(
			axiosAuth,
			new URLSearchParams({
				page,
				pageSize,
				name: projectName,
				category: projectCategory,
			}),
		),
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
			<h2>Options</h2>
			<FormSearchProject setProjectCategory={setProjectCategory} setProjectName={setProjectName} />
			<div className="mb-3" />

			<h2>Legend</h2>
			<div className="row mb-4">
				<div className="col">
					<FaUserPlus color="black" /> / <FaUserPlus color="lightgray" /> - anybody can / cannot
					join project
				</div>
				<div className="col">
					<FaArchive color="black" /> / <FaArchive color="lightgray" /> - project is / is not
					archived
				</div>
			</div>

			<h2>Results</h2>
			{projects.isLoading && <Loading />}

			{projectsList.length === 0 && <p className="text-center mt-4">No projects found</p>}
			{projectsList.map((project) => (
				<ProjectLine key={project.id} projectData={project} />
			))}
			<PaginationViewer totalPages={pageCount} page={page} setPage={setPage} />
		</>
	);
};

export default ProjectsSearch;
