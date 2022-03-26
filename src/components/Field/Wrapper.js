import { joiErrorToString } from "../../utils";

export const Wrapper = ({ children, mb, hint, form, name, id, label }) => {
	const errors = form?.formState?.errors;
	const error = errors?.[name];

	return (
		<div className={mb ?? 'mb-2'}>
			{label && (
				<label className="form-label" htmlFor={name}>
					{label}
				</label>
			)}
			{children}
			{hint && <div className="form-text">{hint}</div>}
			{error && <div className="form-text tc-danger">{joiErrorToString(error)}</div>}
		</div>
	);
};
