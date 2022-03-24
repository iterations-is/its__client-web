import { Navigation } from '../components';

export const VerticalLayout = ({ children }) => (
	<>
		<Navigation />
		<main className="main">{children}</main>
	</>
);
