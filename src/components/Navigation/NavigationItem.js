import { useRouter } from 'next/router';

export const NavigationItem = ({ item }) => {
	const router = useRouter();

	return (
		<li>
			<div className="menu-item" onClick={item.handleClick({ router })}>
				<span className="navigation__icon">{item.icon}</span>
				<span>{item.name}</span>
			</div>
		</li>
	);
};
