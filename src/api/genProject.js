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

export const genGetProjects = (axios) => () => axios.get(`/projects-service/projects`);

export const genGetProjectsSelf = (axios) => () => axios.get(`/projects-service/projects/self`);

export const genGetProject =
	(axios, { projectId }) =>
	() =>
		axios.get(`/projects-service/projects/${projectId}`);

export const genGetPart =
	(axios, { projectId, partId }) =>
	() =>
		axios.get(`/projects-service/projects/${projectId}/parts/${partId}`);

export const genPostCreateProject =
	(axios) =>
	({ projectReq }) =>
		axios.post('/projects-service/projects', projectReq);
