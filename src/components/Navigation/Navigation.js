import { NavigationItem } from './NavigationItem';
import { MenuItemsBottom, MenuItemsTop } from './constants';
import { useAxios } from '../../hooks';
import { useQuery } from 'react-query';
import { genGetSelf } from '../../api';

export const Navigation = () => {
	const { axiosAuth } = useAxios();
	const selfInfo = useQuery('selfInfo', genGetSelf(axiosAuth));

	const roleName = selfInfo?.data?.data?.payload?.role?.name;

	const finalMenuItemsTop =
		roleName === 'admin'
			? MenuItemsTop
			: MenuItemsTop.filter((item) => item.name !== 'Admin Panel');

	return (
		<nav className="navigation">
			<div className="navigation__logo" />

			<div className="navigation__items">
				<ul>
					{finalMenuItemsTop.map((item) => (
						<NavigationItem key={item.name} item={item} />
					))}
				</ul>
				<ul>
					{MenuItemsBottom.map((item) => (
						<NavigationItem key={item.name} item={item} />
					))}
				</ul>
			</div>
		</nav>
	);
};
