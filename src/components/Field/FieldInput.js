import { Wrapper } from './Wrapper';

export const FieldInput = (props) => {
	const { type, name, register, placeholder, ...rest} = props;

	return (
		<Wrapper {...props}>
			<input
				placeholder={placeholder}
				type={type} name={name} id={name} {...register(name)} {...rest} className="form-control" />
		</Wrapper>
	);
};
