import { Navigation } from '../components';

export const VerticalLayout = ({ children, Sidebar }) => (
	<>
		<Navigation />
		{Sidebar && <Sidebar />}
		<main className="main">{children}</main>
	</>
);
