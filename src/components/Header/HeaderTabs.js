import Link from 'next/link';
import styles from './HeaderTabs.module.scss';

export const HeaderTabs = ({ tabs = [], tabActive }) => (
	<nav className={styles.headerTabs}>
		{tabs.map((tab) => (
			<span
				key={tab.id}
				className={`${styles.headerTabs__item} ${
					tab.id === tabActive ? styles.headerTabs__item_active : ''
				}`}>
				<Link href={tab.href}>
					<a>{tab.title}</a>
				</Link>
			</span>
		))}
	</nav>
);
