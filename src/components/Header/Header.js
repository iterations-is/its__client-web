import { HeaderTabs } from './HeaderTabs';
import styles from './Header.module.scss';

export const Header = ({ title, subtitle, tabs = [], tabActive, isUserLeader }) => {
	const finalTabs = isUserLeader ? tabs : tabs.filter(tab => tab.id !== 'settings');
	return (
		<header className={styles.header}>
			<h1>{title}</h1>
			{subtitle && <h6>{subtitle}</h6>}
			{finalTabs.length > 0 && <HeaderTabs tabs={finalTabs} tabActive={tabActive} />}
			<div className={styles.headerLine} />
		</header>
	);
};
