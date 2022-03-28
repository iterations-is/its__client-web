import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Header, FormButton, ProjectLine, PaginationViewer, Loading } from '../../src/components';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { genGetProjectsSelf } from '../../src/api';
import { useState } from 'react';
import { FaArchive, FaUserPlus } from 'react-icons/fa';
import { FormSearchProject } from '../../src/containers';

const ProjectsDashboard = () => {
	useAuthorisation();

	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const [pageCount, setPageCount] = useState(0);

	const [projectName, setProjectName] = useState('');
	const [projectCategory, setProjectCategory] = useState('');

	const router = useRouter();
	const { axiosAuth } = useAxios();
	const projects = useQuery(
		['projectsSelf', page, pageSize, projectName, projectCategory],
		genGetProjectsSelf(
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
				title="User Dashboard"
				subtitle="projects created by the user and projects with contribution"
			/>
			<h2>Create a new project</h2>
			<div className="row mb-3">
				<div className="col">
					<FormButton onClick={() => router.push('/projects/create')}>Create project</FormButton>
				</div>
			</div>
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

			<h2>User projects</h2>
			{projects.isLoading && <Loading />}
			{projectsList.length === 0 && <p className="text-center mt-4">No projects found</p>}
			{projectsList.map((project) => (
				<ProjectLine key={project.id} projectData={project} />
			))}
			<PaginationViewer totalPages={pageCount} page={page} setPage={setPage} />
		</>
	);
};

export default ProjectsDashboard;
