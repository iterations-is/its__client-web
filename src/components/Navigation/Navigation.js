import { NavigationItem } from './NavigationItem';
import { MenuItemsBottom, MenuItemsTop } from './constants';

export const Navigation = () => (
	<nav className="navigation">
		<div className="navigation__logo" />

		<div className="navigation__items">
			<ul>
				{MenuItemsTop.map((item) => (
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
