import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { PROJECT_TITLE } from '../src/constants';
import { Layout } from '../src/layouts';
import { queryClient } from '../src/query/client';
import { AxiosProvider } from '../src/hooks';

import 'animate.css';
import 'src/scss/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }) => {
	const PageLayout = Component.Layout || Layout.Vertical;
	const PageSidebar = Component.Sidebar || null;

	return (
		<>
			<Head>
				<title>{PROJECT_TITLE}</title>
				<meta name="description" content="Iterations - Information System" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<AxiosProvider>
					<ReactQueryDevtools initialIsOpen={false} />
					<PageLayout Sidebar={PageSidebar}>
						<Component {...pageProps} />
					</PageLayout>
				</AxiosProvider>
			</QueryClientProvider>
			<ToastContainer />
		</>
	);
};

export default App;
