import style from './MonitoringStatusLine.module.scss';
import { MdCheckCircle, MdError } from 'react-icons/md';

export const MonitoringStatusLine = ({ msStatus }) => {
	const {
		status: fetchStatus,
		value: { name, status: msStatusCode, data: { name: msName, version, description } = {} },
	} = msStatus;

	return (
		<div className={style.monitoringStatusLine}>
			{fetchStatus !== 'fulfilled' && <div>Fetch failed.</div>}

			{fetchStatus === 'fulfilled' && (
				<div className="d-flex justify-content-between align-items-center">
					<div>
						<h4>MS: {name}</h4>
						<div className="d-flex">
							<div className="me-3">Status: {msStatusCode}</div>
							<div className="me-3">ID: {msName}</div>
							<div className="me-3">Version: {version}</div>
						</div>
					</div>
					<div>
						{msStatusCode === 200 ? (
							<MdCheckCircle size="2rem" color="darkgreen" />
						) : (
							<MdError size="2rem" color="crimson" />
						)}
					</div>
				</div>
			)}
		</div>
	);
};
