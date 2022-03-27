import { Wrapper } from './Wrapper';

export const FieldTextArea = (props) => {
	const { form, name, ...rest } = props;

	return (
		<Wrapper {...props}>
			<textarea name={name} id={name} {...form.register(name)} className="form-control" {...rest} />
		</Wrapper>
	);
};
