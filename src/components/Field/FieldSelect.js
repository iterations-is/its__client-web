import { Wrapper } from './Wrapper';

export const FieldSelect = (props) => {
	const { name, register, options } = props;

	return (
		<Wrapper {...props}>
			<select name={name} id={name} {...register(name)} className="form-control">
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</Wrapper>
	);
};
