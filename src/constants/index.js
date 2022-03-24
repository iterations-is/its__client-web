export const PROJECT_TITLE = 'Iterations';

export const URI_BASE = process.env.NEXT_PUBLIC_URI_BASE;

export const genAdminMenuItems = () => [
	{
		id: 'monitoring',
		href: '/admin/home',
		title: 'Monitoring',
	},
	{
		id: 'categories',
		href: '/admin/categories',
		title: 'Project Categories',
	},
];

export const genProjectMenuItems = (projectId) => [
	{
		id: 'description',
		title: 'Description',
		href: `/projects/project/${projectId}/description`,
	},
	{
		id: 'content',
		title: 'Content',
		href: `/projects/project/${projectId}/content`,
	},
	{
		id: 'team',
		title: 'Team',
		href: `/projects/project/${projectId}/team`,
	},
	{
		id: 'settings',
		title: 'Settings',
		href: `/projects/project/${projectId}/settings`,
	},
];
