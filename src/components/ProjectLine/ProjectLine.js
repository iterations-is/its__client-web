import { useState } from 'react';
import style from './ProjectLine.module.scss';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useRouter } from 'next/router';

export const ProjectLine = ({ projectData }) => {
	const { name, category, descriptionPublic, id } = projectData;
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	return (
		<div className={style.projectLine} onClick={() => router.push(`/projects/project/${id}/description`)}>
			<div className={style.projectLineSummary}>
				<div>
					<div className="project-line__category">{category}</div>
					<div className="project-line__name">{name}</div>
				</div>

				<span
					className="btn btn-primary"
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen(!isOpen);
					}}>
					<HiDotsHorizontal />
				</span>
			</div>

			{isOpen && (
				<div className={style.projectLineDetail}>
					<div className="project-line__description">{descriptionPublic}</div>
				</div>
			)}
		</div>
	);
};
