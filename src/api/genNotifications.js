export const genGetNotifications = (axios, page, pageSize) => () =>
	axios.get('/communication-service/notifications?page=' + page + '&pageSize=' + pageSize);

export const genPatchNotification = (axios) => (notificationId) =>
	axios.patch(`/communication-service/notifications/${notificationId}`);

export const genDeleteNotification = (axios) => (notificationId) =>
	axios.delete(`/communication-service/notifications/${notificationId}`);
