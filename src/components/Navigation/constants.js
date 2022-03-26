import {
	MdAdminPanelSettings,
	MdLogout,
	MdManageSearch,
	MdNotifications,
	MdPrecisionManufacturing,
	MdStyle,
	MdSupport,
} from 'react-icons/md';
import { removeCredentials } from '../../hooks';

export const MenuItemsTop = [
	{
		icon: <MdManageSearch />,
		name: 'Search Projects',
		handleClick:
			({ router }) =>
			() => {
				router.push('/projects/search');
			},
	},
	{
		icon: <MdPrecisionManufacturing />,
		name: 'User Projects',
		handleClick:
			({ router }) =>
			() => {
				router.push('/projects/dashboard');
			},
	},
	{
		icon: <MdNotifications />,
		name: 'Notifications',
		handleClick:
			({ router }) =>
			() => {
				router.push('/notifications/overview');
			},
	},
	{
		icon: <MdAdminPanelSettings />,
		name: 'Admin Panel',
		handleClick:
			({ router }) =>
			() => {
				router.push('/admin/home');
			},
	},
	{
		icon: <MdSupport />,
		name: 'Help',
		handleClick:
			({ router }) =>
			() => {
				router.push('/help');
			},
	},
	{
		icon: <MdStyle />,
		name: 'Style Guide',
		handleClick:
			({ router }) =>
			() => {
				router.push('/style-guide');
			},
	},
];

export const MenuItemsBottom = [
	{
		icon: <MdLogout />,
		name: 'Sign Out',
		handleClick:
			({ router }) =>
			() => {
				removeCredentials();
				router.push('/');
			},
	},
];
