import { useRouter } from 'next/router';
import { FormButton, Header, UserBadge } from '../../../../src/components';
import { useMutation, useQuery } from 'react-query';
import { genDeleteLeaveTeam, genGetProject, genPatchJoinTeam } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAuthorisation, useAxios } from '../../../../src/hooks';
import { IoInfiniteSharp } from 'react-icons/io5';
import { queryClient } from '../../../../src/query/client';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';
import { ProjectSidebar } from '../../../../src/containers';
import { isUserProjectLeader } from '../../../../src/utils';

const ProjectRoleSection = ({ role, projectId, joinable }) => {
	const { axiosAuth } = useAxios();

	const rqJoinTeam = useMutation(genPatchJoinTeam(axiosAuth, projectId), {
		onSuccess: () => {
			queryClient.invalidateQueries('project' + projectId);
		},
		onError: (error) => {
			if (error?.response?.data?.code === 'LAST_LEADER') {
				toast.error("You can't leave the team, because you are the last leader.");
				return;
			}
			toast.error("Can't join the team. Please try again.");
		},
	});

	return (
		<div>
			<h3 className="mt-4">
				{role.name} ( {role.projectRoleAssignments.length} /{' '}
				{role.capacity !== -1 ? role.capacity : <IoInfiniteSharp />})
			</h3>
			{role.projectRoleAssignments.map((assignment) => (
				<div key={assignment.id}>
					<UserBadge userId={assignment.userId} />
				</div>
			))}
			{(role.capacity === -1 || role.projectRoleAssignments.length < role.capacity) &&
				role.name !== 'Leader' &&
				joinable && (
					<FormButton
						icons={[undefined, <FaUserPlus key="ri" />]}
						disabled={rqJoinTeam.isLoading}
						loading={rqJoinTeam.isLoading}
						onClick={() => {
							rqJoinTeam.mutate(role.id);
						}}>
						Join as {role.name}
					</FormButton>
				)}
		</div>
	);
};

const ProjectTeam = () => {
	useAuthorisation();

	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const rqGetProject = useQuery('project' + projectId, genGetProject(axiosAuth, { projectId }), {
		enabled: projectId !== undefined,
	});

	const rqLeaveTeam = useMutation(genDeleteLeaveTeam(axiosAuth, projectId), {
		onSuccess: () => {
			queryClient.invalidateQueries('project' + projectId);
		},
		onError: (error) => {
			if (error?.response?.data?.code === 'LAST_LEADER') {
				toast.error("You can't leave the team, because you are the last leader.");
				return;
			}
			toast.error("Can't leave the team. Please try again.");
		},
	});

	const joinable = rqGetProject.data?.data?.payload?.joinable ?? false;
	const projectRoles = rqGetProject.data?.data?.payload?.projectRoles ?? [];

	const isInTeam = projectRoles.some((role) => {
		const userId = localStorage.getItem('userId');
		return role.projectRoleAssignments.some((assignment) => assignment.userId === userId);
	});

	return (
		<>
			<Header
				title={rqGetProject.data?.data?.payload?.name ?? '-'}
				subtitle="team and vacancies"
				tabs={genProjectMenuItems(projectId)}
				tabActive="team"
				isUserLeader={isUserProjectLeader(rqGetProject)}
			/>

			<h2>Members and capacity</h2>
			{projectRoles.map((role) => (
				<ProjectRoleSection key={role.id} projectId={projectId} role={role} joinable={joinable} />
			))}

			{isInTeam && (
				<>
					<h2 className="mt-5">Actions</h2>
					<FormButton
						onClick={() => {
							rqLeaveTeam.mutate();
						}}>
						Leave team
					</FormButton>
				</>
			)}
		</>
	);
};

ProjectTeam.Sidebar = ProjectSidebar;

export default ProjectTeam;
