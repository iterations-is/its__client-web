import Link from 'next/link';

export const Button = ({ text, link, icons = [] }) => (
	<Link href={link}>
		<a className="btn btn--primary">{text}</a>
	</Link>
);
