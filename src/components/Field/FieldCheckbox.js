export const FieldCheckbox = (props) => {
	const { form, name, placeholder, label, hint, ...rest } = props;

	return (
		<div className="mb-3">
			<label className="field field--state-element">
				<div className="field-state-element__control switch">
					<input type="checkbox" name={name} id={name} {...form.register(name)} {...rest} />
					<div className="switch__inner" />
				</div>
				<div className="field-state-element__label">{label}</div>
			</label>
			{hint && <div className="form-text">{hint}</div>}
		</div>
	);
};
