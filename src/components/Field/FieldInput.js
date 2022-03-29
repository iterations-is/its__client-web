import { Wrapper } from './Wrapper';

export const FieldInput = (props) => {
	const { form, type, name, placeholder, className, ...rest } = props;

	return (
		<Wrapper {...props}>
			<input
				placeholder={placeholder}
				type={type}
				name={name}
				id={name}
				{...form.register(name)}
				{...rest}
				className={"form-control " + className}
			/>
		</Wrapper>
	);
};
