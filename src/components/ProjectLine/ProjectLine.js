import { useState } from 'react';
import style from './ProjectLine.module.scss';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { FaArchive, FaUserPlus } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export const ProjectLine = ({ projectData }) => {
	const { name, category, descriptionPublic, id, joinable, archived, createdAt } = projectData;
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	return (
		<div
			className={style.projectLine}
			onClick={() => router.push(`/projects/project/${id}/description`)}>
			<div className={style.projectLineSummary}>
				<div>
					<h5 className="mb-0">{name}</h5>
					<div className="d-flex">
						<div className="fst-italic fs-6 me-3">
							Created: {new Date(createdAt).toLocaleString()}
						</div>
						<div>Category: {category?.name}</div>
					</div>
				</div>

				<div className="ms-4 d-flex justify-content-end align-items-center">
					<div className={style.projectLineDetailIcon}>
						<FaUserPlus color={joinable ? 'black' : 'lightgray'} />
					</div>
					<div className={style.projectLineDetailIcon}>
						<FaArchive color={archived ? 'black' : 'lightgray'} />
					</div>
					<div
						className={`${style.projectLineDetailIcon} ${style.projectLineDetailIconExtra}`}
						onClick={(e) => {
							e.stopPropagation();
							setIsOpen(!isOpen);
						}}>
						<HiDotsHorizontal />
					</div>
				</div>
			</div>

			{isOpen && (
				<div className={style.projectLineDetail}>
					<ReactMarkdown children={descriptionPublic || "The project has no public description."} />
				</div>
			)}
		</div>
	);
};
