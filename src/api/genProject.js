export const genGetCategories = (axios) => () => axios.get('/projects-service/categories');

export const genPostCreateCategory =
	(axios) =>
	({ categoryReq }) =>
		axios.post('/projects-service/categories', categoryReq);

export const genPatchUpdateCategory =
	(axios) =>
	({ categoryId, categoryReq }) =>
		axios.patch(`/projects-service/categories/${categoryId}`, categoryReq);

export const genDeleteCategory = (axios) => (categoryId) =>
	axios.delete(`/projects-service/categories/${categoryId}`);

export const genGetProject = (axios) => () =>
	axios.get('https://jsonplaceholder.typicode.com/todos/1');

export const genGetPart =
	(axios, { projectId, partId }) =>
	() => {
		if (!projectId || !partId) {
			return '';
		}
		return axios.get(`/projects-service/projects/${projectId}/parts/${partId}`);
	};
