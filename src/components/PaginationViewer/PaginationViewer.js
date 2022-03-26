import style from './PaginationViewer.module.scss';
import { MdFirstPage, MdLastPage } from 'react-icons/md';

export const PaginationViewer = ({ totalPages, page, setPage }) => {
	const pageNumbers = [page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3].filter(
		(x) => x >= 1 && x <= totalPages,
	);

	if (totalPages < 1) return null;

	return (
		<div className={style.pagination}>
			<div className={style.paginationItem} onClick={() => setPage(1)}>
				<MdFirstPage />
			</div>
			{pageNumbers.map((pageNumber) => (
				<div
					key={pageNumber}
					className={[style.paginationItem, pageNumber === page ? style.active : null].join(' ')}
					onClick={() => setPage(pageNumber)}>
					{pageNumber}
				</div>
			))}
			<div className={style.paginationItem} onClick={() => setPage(totalPages)}>
				<MdLastPage />
			</div>
		</div>
	);
};
