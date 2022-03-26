import { useState } from 'react';
import { Header, Loading, Notification, PaginationViewer } from '../../src/components';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { useQuery } from 'react-query';
import { genGetNotifications } from '../../src/api';

const Overview = () => {
	useAuthorisation();

	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const [pageCount, setPageCount] = useState(0);

	const { axiosAuth } = useAxios();
	const { isLoading, data } = useQuery(
		['notifications', page, pageSize],
		genGetNotifications(axiosAuth, page, pageSize),
		{
			staleTime: 3000,
			keepPreviousData: true,
			onSuccess: (data) => {
				setPageCount(Math.ceil(data?.data?.payload?.pagination?.total / pageSize));
			},
		},
	);

	const notifications = data?.data?.payload?.notifications ?? [];

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
			{notifications.map((notification) => (
				<Notification key={notification.id} {...notification} />
			))}
			<PaginationViewer totalPages={pageCount} page={page} setPage={setPage} />
		</div>
	);
};

export default Overview;
