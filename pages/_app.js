import Head from 'next/head';

import 'animate.css';
import 'src/scss/index.scss';
import { PROJECT_TITLE } from 'src/constants';
import { Layout } from '../src/layouts';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../src/query/client';
import { AxiosProvider } from '../src/hooks/useAxios';
import { ReactQueryDevtools } from 'react-query/devtools';

const App = ({ Component, pageProps }) => {
	const PageLayout = Component.Layout || Layout.Vertical;

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
					<PageLayout>
						<Component {...pageProps} />
					</PageLayout>
				</AxiosProvider>
			</QueryClientProvider>
		</>
	);
};

export default App;
