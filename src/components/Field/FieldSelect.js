import { Wrapper } from './Wrapper';

export const FieldSelect = (props) => {
	const { form, name, options, ...rest } = props;

	return (
		<Wrapper {...props}>
			<select name={name} id={name} {...form.register(name)} className="form-control" {...rest}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</Wrapper>
	);
};
