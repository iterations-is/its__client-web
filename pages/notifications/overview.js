import { Header, Loading, Notification } from '../../src/components';
import { useAuthorisation } from '../../src/hooks/useAuthorisation';
import { useAxios } from '../../src/hooks/useAxios';
import { useQuery } from 'react-query';
import { genGetNotifications } from '../../src/api';

const Overview = () => {
	useAuthorisation();

	const { axiosAuth } = useAxios();
	const { isLoading, data } = useQuery('notifications', genGetNotifications(axiosAuth));

	const notifications = data?.data?.payload ?? [];

	return (
		<div>
			<Header
				title="Notifications"
				subtitle="user notification from all projects and information system"
			/>
			{isLoading && <Loading />}

			{notifications.length === 0 && !isLoading && (
				<div className="text-center">
					<h6>No notifications</h6>
				</div>
			)}
			{notifications &&
				notifications.map((notification) => (
					<Notification key={notification.id} {...notification} />
				))}
		</div>
	);
};

export default Overview;
