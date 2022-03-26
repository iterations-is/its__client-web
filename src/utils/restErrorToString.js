export const restErrorToString = (error) => {
	switch (error?.code) {
		case 'INVALID_CREDENTIALS':
			return 'Username or password is incorrect';
		case 'UNIQUE_USERNAME':
			return 'Username is not unique';
		case 'UNIQUE_EMAIL':
			return 'Email is not unique';
		default:
			return `Unknown error: ${error?.code || error?.message}`;
	}
};
