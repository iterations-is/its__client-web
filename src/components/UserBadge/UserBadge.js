import { useAxios } from '../../hooks';
import { useQuery } from 'react-query';
import { genGetUser } from '../../api';
import Image from 'next/image';
import style from './UserBadge.module.scss';

export const UserBadge = ({ userId }) => {
	const { axiosAuth } = useAxios();
	const qUser = useQuery(`user-${userId}`, genGetUser(axiosAuth, { userId }), {
		enabled: userId !== undefined,
	});

	const userData = qUser?.data?.data?.payload ?? {};

	return (
		<div className={style.userBadge}>
			<Image src={userData.gravatar} alt="Avatar" />
			<div className={style.userBadgeText}>
				<div>
					{userData.name} ({userData.username})
				</div>
				<div>Role: {userData?.role?.name}</div>
			</div>
		</div>
	);
};
