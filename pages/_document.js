import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* Google Fonts */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link
						href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default AppDocument;
