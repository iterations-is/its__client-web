export const genGetSelf = (axios) => () => axios.get('/users-service/users/self');
export const genGetUser =
	(axios, { userId }) =>
	() =>
		axios.get(`/users-service/users/${userId}`);
export const genDeleteSelf = (axios) => () => axios.delete('/users-service/users/self');
