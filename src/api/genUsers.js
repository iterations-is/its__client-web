export const genGetSelf = (axios) => () => axios.get('/users-service/users/self');
export const genDeleteSelf = (axios) => () => axios.delete('/users-service/users/self');
