export const genGetInterpreters = (axios) => () => axios.get(`/interpreters-service/interpreters`);
export const genPostInterpreter =
	(axios) =>
	({ interpreterReq }) =>
		axios.post(`/interpreters-service/interpreters`, interpreterReq);
export const genGetInterpreter =
	(axios, { name, version }) =>
	() =>
		axios.get(`/interpreters-service/interpreters/${name}/${version}`);
export const genDeleteInterpreter =
	(axios, { id }) =>
	() =>
		axios.delete(`/interpreters-service/interpreters/${id}`);

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

export const genGetProjects = (axios, query) => () =>
	axios.get(`/projects-service/projects?${query.toString()}`);

export const genGetProjectsSelf = (axios, query) => () =>
	axios.get(`/projects-service/projects/self?${query.toString()}`);

export const genGetProject =
	(axios, { projectId }) =>
	() =>
		axios.get(`/projects-service/projects/${projectId}`);

export const genGetPart =
	(axios, { projectId, partId }) =>
	() =>
		axios.get(`/projects-service/projects/${projectId}/parts/${partId}`);

export const genPostPart =
	(axios, { projectId }) =>
	(partReq) =>
		axios.post(`/projects-service/projects/${projectId}/parts`, partReq);

export const genPatchPart =
	(axios, { projectId, partId }) =>
	(partReq) =>
		axios.patch(`/projects-service/projects/${projectId}/parts/${partId}`, partReq);

export const genPostCreateProject =
	(axios) =>
	({ projectReq }) =>
		axios.post('/projects-service/projects', projectReq);

export const genPatchUpdateProject =
	(axios, projectId) =>
	({ projectReq }) =>
		axios.patch(`/projects-service/projects/${projectId}`, projectReq);

export const genPatchJoinTeam = (axios, projectId) => (roleId) =>
	axios.patch(`/projects-service/projects/${projectId}/team/${roleId}`);

export const genDeleteLeaveTeam = (axios, projectId) => () =>
	axios.delete(`/projects-service/projects/${projectId}/team`);

export const genPostCreateRole =
	(axios, projectId) =>
	({ roleReq }) =>
		axios.post(`/projects-service/projects/${projectId}/roles`, roleReq);

export const genPatchUpdateRole =
	(axios, projectId, roleId) =>
	({ roleReq }) =>
		axios.patch(`/projects-service/projects/${projectId}/roles/${roleId}`, roleReq);

export const genDeleteRole = (axios, projectId, roleId) => () =>
	axios.delete(`/projects-service/projects/${projectId}/roles/${roleId}`);
