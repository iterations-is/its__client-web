export const genGetNotifications = (axios) => () =>
	axios.get('/communication-service/notifications');

export const genPatchNotification = (axios) => (notificationId) =>
	axios.patch(`/communication-service/notifications/${notificationId}`);

export const genDeleteNotification = (axios) => (notificationId) =>
	axios.delete(`/communication-service/notifications/${notificationId}`);
