import style from './FormButton.module.scss';
import { RiLoader5Line } from 'react-icons/ri';

export const FormButton = ({
	submit,
	children,
	disabled,
	onClick,
	icons = [],
	loading,
	full,
	className,
	iconOnly,
}) => {
	const rightIcon =
		(loading ? <RiLoader5Line className={style.formButtonIconLoader} /> : icons[1]) ?? null;
	const leftIcon = icons[0] ?? null;
	const iconOnlyIcon =
		(loading ? <RiLoader5Line className={style.formButtonIconLoader} /> : icons[0]) ?? null;

	return (
		<button
			type={submit ? 'submit' : 'button'}
			disabled={disabled}
			onClick={onClick}
			className={
				'btn btn--primary ' +
				(full ? 'btn--full-width' : '') +
				' ' +
				(className ? className : '') +
				' ' +
				style.formButton
			}>
			{iconOnly && iconOnlyIcon}
			{!iconOnly && (
				<>
					<div className={style.formButtonIconLeft}>{leftIcon}</div>
					{children}
					<div className={style.formButtonIconRight}>{rightIcon}</div>
				</>
			)}
		</button>
	);
};
