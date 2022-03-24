export const genPostSignIn = (axios) => (credentials) => axios.post('/auth-service/signin', credentials);
