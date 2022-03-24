import { Header, Loading, MonitoringStatusLine } from '../../src/components';
import { useQuery } from 'react-query';
import { genGetMonitoringStatus } from '../../src/api';
import { useAuthorisation } from '../../src/hooks/useAuthorisation';
import { useAxios } from '../../src/hooks/useAxios';

const AdminHome = () => {
	useAuthorisation();

	const { axiosAuth } = useAxios();
	const { isLoading, data } = useQuery(
		'monitoringStatuses',
		genGetMonitoringStatus(axiosAuth),
	);
	const payload = data?.data?.data ?? [];

	return (
		<>
			<Header
				title="Administration Panel"
				subtitle="tools for geeks"
				tabs={[
					{
						id: 'monitoring',
						href: '/admin/home',
						title: 'Monitoring',
					},
					{
						id: 'categories',
						href: '/admin/categories',
						title: 'Project Categories',
					},
				]}
				tabActive="monitoring"
			/>
			{isLoading && <Loading />}
			{payload.map((status) => (
				<MonitoringStatusLine key={status?.value?.name} msStatus={status} />
			))}
		</>
	);
};

export default AdminHome;
