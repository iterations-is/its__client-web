import Link from 'next/link';

export const NavigationItem = ({ item }) => (
	<li>
		<Link href={item.link}>
			<a>
				<span className="navigation__icon">{item.icon}</span>
				<span>{item.name}</span>
			</a>
		</Link>
	</li>
);
