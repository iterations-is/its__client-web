import {
	MdAdminPanelSettings,
	MdLogout,
	MdManageSearch,
	MdNotifications,
	MdPrecisionManufacturing,
	MdStyle,
	MdSupport,
} from 'react-icons/md';

export const MenuItemsTop = [
	{
		link: '/style-guide',
		icon: <MdStyle />,
		name: 'Style Guide',
	},
	{
		link: '/projects',
		icon: <MdManageSearch />,
		name: 'Search Projects',
	},
	{
		link: '/user-projects',
		icon: <MdPrecisionManufacturing />,
		name: 'User Projects',
	},
	{
		link: '/notifications',
		icon: <MdNotifications />,
		name: 'Notifications',
	},
	{
		link: '/admin',
		icon: <MdAdminPanelSettings />,
		name: 'Admin Panel',
	},
	{
		link: '/help',
		icon: <MdSupport />,
		name: 'Help',
	},
];

export const MenuItemsBottom = [
	{
		link: '/',
		icon: <MdLogout />,
		name: 'Sign Out',
	},
];
