export const FieldCheckbox = (props) => {
	const { type, name, register, placeholder, label, ...rest } = props;

	return (
		<label className="field field--state-element mb-3">
			<div className="field-state-element__control switch">
				<input type="checkbox" name={name} id={name} {...register(name)} {...rest} />
				<div className="switch__inner" />
			</div>
			<div className="field-state-element__label">{label}</div>
		</label>
	);
};
