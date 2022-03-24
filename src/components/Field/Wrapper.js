export const Wrapper = ({ children, mb, hint, errors, name, id, label }) => {
	const error = errors?.[name];

	return (
		<div className={mb ?? 'mb-3'}>
			{label && (
				<label className="form-label" htmlFor={name}>
					{label}
				</label>
			)}
			{children}
			{hint && <div className="form-text">{hint}</div>}
			{error && <span className="form-text">{error}</span>}
		</div>
	);
};
