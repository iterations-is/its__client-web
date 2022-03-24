import { HeaderTabs } from './HeaderTabs';
import styles from './Header.module.scss';

export const Header = ({ title, subtitle, tabs = [], tabActive }) => (
	<header className={styles.header}>
		<h1>{title}</h1>
		{subtitle && <h6>{subtitle}</h6>}
		{tabs.length > 0 && <HeaderTabs tabs={tabs} tabActive={tabActive} />}
		<div className={styles.headerLine} />
	</header>
);
