import { RiLoader4Fill } from 'react-icons/ri';
import style from './Loading.module.scss';

export const Loading = () => (
	<div className={style.loader}>
		<RiLoader4Fill
			className={`${style.loaderIcon} text-gray-500 animate__infinite animate__animated animate__slow`}
			size="3rem"
		/>
	</div>
);
