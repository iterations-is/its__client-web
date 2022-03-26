import style from './Notification.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { genDeleteNotification, genPatchNotification } from '../../api';
import { useAxios } from '../../hooks';
import { queryClient } from '../../query/client';
import { ImBin2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { FormButton } from '../FormButton';

export const Notification = ({ id, isRead, description, createdAt }) => {
	const { axiosAuth } = useAxios();
	const readNotification = useMutation(genPatchNotification(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('notifications');
			toast.success('Notification state was changed');
		},
		onError: () => {
			toast.error('Notification state cannot be changed');
		},
	});

	const deleteNotification = useMutation(genDeleteNotification(axiosAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries('notifications');
			toast.success('Notification was removed');
		},
		onError: () => {
			toast.error('Notification cannot be removed');
		},
	});

	return (
		<div className={style.notification}>
			<div className={style.notificationSummary}>
				<div className={style.notificationTime}>{new Date(createdAt).toLocaleString()}</div>
				<div className={!isRead ? 'fw-bold' : ''}>{description}</div>
			</div>
			<div>
				<FormButton
					className="me-1"
					onClick={() => {
						readNotification.mutate(id);
					}}>
					{isRead ? <FaEye /> : <FaEyeSlash />}
				</FormButton>
				<FormButton
					onClick={() => {
						deleteNotification.mutate(id);
					}}>
					<ImBin2 />
				</FormButton>
			</div>
		</div>
	);
};
