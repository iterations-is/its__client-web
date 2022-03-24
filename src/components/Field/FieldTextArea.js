import { Wrapper } from './Wrapper';

export const FieldTextArea = (props) => {
	const { name, register } = props;

	return (
		<Wrapper {...props}>
			<textarea name={name} id={name} {...register(name)} className="form-control" />
		</Wrapper>
	);
};
