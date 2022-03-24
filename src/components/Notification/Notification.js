import style from './Notification.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { genDeleteNotification, genPatchNotification } from '../../api';
import { useAxios } from '../../hooks/useAxios';
import { queryClient } from '../../query/client';
import { ImBin2 } from 'react-icons/im';

export const Notification = ({ id, isRead, description, createdAt }) => {
	const { axiosAuth } = useAxios();
	const readNotification = useMutation(genPatchNotification(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('notifications');
		},
	});

	const deleteNotification = useMutation(genDeleteNotification(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('notifications');
		},
	});

	return (
		<div className={style.notification}>
			<div className={style.notificationSummary}>
				<div className={style.notificationTime}>{new Date(createdAt).toLocaleString()}</div>
				<div className={!isRead ? 'fw-bold' : ''}>{description}</div>
			</div>
			<div>
				<a
					className="btn btn-primary"
					onClick={() => {
						readNotification.mutate(id);
					}}>
					{isRead ? <FaEye /> : <FaEyeSlash />}
				</a>
				<a
					className="btn btn-primary"
					onClick={() => {
						deleteNotification.mutate(id);
					}}>
					<ImBin2 />
				</a>
			</div>
		</div>
	);
};
