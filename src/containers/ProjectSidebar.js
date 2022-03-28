import { Tag } from '../components';
import { MdTaskAlt } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useAxios } from '../hooks';
import { useQuery } from 'react-query';
import { genGetProject, genGetUser } from '../api';
import { IoInfiniteSharp } from 'react-icons/io5';

const Username = ({ userId }) => {
	const { axiosAuth } = useAxios();
	const qUser = useQuery(`user-${userId}`, genGetUser(axiosAuth, { userId }), {
		enabled: userId !== undefined,
	});
	const userData = qUser?.data?.data?.payload ?? {};

	return (
		<span>
			{userData.name}
			{userData?.role?.name === 'authority' && <MdTaskAlt className="ms-1 authority-mark" />}
		</span>
	);
};

export const ProjectSidebar = () => {
	const router = useRouter();
	const { projectId } = router.query;
	const { axiosAuth } = useAxios();
	const project = useQuery('project' + projectId, genGetProject(axiosAuth, { projectId }), {
		enabled: projectId !== undefined,
	});

	console.log(project?.data?.data?.payload);

	const isArchived = project?.data?.data?.payload?.archived;
	const category = project?.data?.data?.payload?.category?.name;
	const created = project?.data?.data?.payload?.createdAt;
	const isJoinable = project?.data?.data?.payload?.joinable;
	const leaders = project?.data?.data?.payload?.projectRoles?.filter(
		(role) => role.name === 'Leader',
	)?.[0]?.projectRoleAssignments ?? [];
	const notLeaders = project?.data?.data?.payload?.projectRoles?.filter(
		(role) => role.name !== 'Leader',
	);
	const isPublic = project?.data?.data?.payload?.public;
	const isSearchable = project?.data?.data?.payload?.searchable;

	return (
		<aside className="sidebar">
			<span className="sidebar__title">Leaders</span>
			<ul>
				{leaders.map((leader) => (
					<li>
						<Username userId={leader.userId} />
					</li>
				))}
			</ul>
			{isJoinable && (
				<>
					<span className="sidebar__title">Vacancies</span>
					<ul>
						{notLeaders.map((role) => (
							<li>
								<span>{role.name}</span>
								<Tag>
									{role.projectRoleAssignments.length} /{' '}
									{role.capacity !== -1 ? role.capacity : <IoInfiniteSharp />}
								</Tag>
							</li>
						))}
					</ul>
				</>
			)}
			<span className="sidebar__title">Metadata</span>
			<ul>
				<li>
					<span>Created</span>
					<Tag>{new Date(created).toLocaleString()}</Tag>
				</li>
				<li>
					<span>Archived</span>
					<Tag>{isArchived ? 'Yes' : 'No'}</Tag>
				</li>
				<li>
					<span>Searchable</span>
					<Tag>{isSearchable ? 'Yes' : 'No'}</Tag>
				</li>
				<li>
					<span>Public content</span>
					<Tag>{isPublic ? 'Yes' : 'No'}</Tag>
				</li>
				<li>
					<span>Joinable</span>
					<Tag>{isJoinable ? 'Yes' : 'No'}</Tag>
				</li>
			</ul>
		</aside>
	);
};
