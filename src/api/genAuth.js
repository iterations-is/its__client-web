export const genPostSignIn =
	(axios) =>
	({ authReq }) =>
		axios.post('/auth-service/signin', authReq);

export const genPostSignUp =
	(axios) =>
	({ authReq }) =>
		axios.post('/auth-service/signup', authReq);

export const genPostResetPassword =
	(axios) =>
	({ authReq }) =>
		axios.post('/auth-service/reset-password', authReq);
