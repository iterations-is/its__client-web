export const isUserProjectLeader = (project) => {
	const userId = typeof window !== 'undefined' ? localStorage?.getItem('userId') : '';

	return project?.data?.data?.payload?.projectRoles.some(
		(role) =>
			(role.name === 'Leader') &
			role.projectRoleAssignments.some((assignment) => assignment.userId === userId),
	);
};
