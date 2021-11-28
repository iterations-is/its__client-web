import Head from 'next/head';

import 'src/scss/index.scss';
import { PROJECT_TITLE } from 'src/constants';

const App = ({ Component, pageProps }) => (
	<>
		<Head>
			<title>{PROJECT_TITLE}</title>
			<meta name="description" content="Iterations - Information System" />
			<link rel="icon" href="/favicon.png" />
		</Head>
		<Component {...pageProps} />
	</>
);

export default App;
