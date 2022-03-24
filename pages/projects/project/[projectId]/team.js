import { useRouter } from 'next/router';
import { Header, UserBadge } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetProject } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAxios } from '../../../../src/hooks';
import { IoInfiniteSharp } from 'react-icons/io5';

const ProjectTeam = () => {
	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const project = useQuery('project' + projectId, genGetProject(axiosAuth, { projectId }), {
		enabled: projectId !== undefined,
	});

	const projectRoles = project.data?.data?.payload?.projectRoles ?? [];

	return (
		<>
			<Header
				title="Project name"
				subtitle="team and vacancies"
				tabs={genProjectMenuItems(projectId)}
				tabActive="team"
			/>
			{projectRoles.map((role) => (
				<div key={role.id}>
					<h3>
						{role.name} ( {role.projectRoleAssignments.length} /{' '}
						{role.capacity !== -1 ? role.capacity : <IoInfiniteSharp />})
					</h3>
					{role.projectRoleAssignments.map((assignment) => (
						<div key={assignment.id}>
							<UserBadge userId={assignment.userId} />
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default ProjectTeam;
