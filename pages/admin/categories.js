import { Header, Loading } from '../../src/components';
import { useQuery } from 'react-query';
import { genGetCategories } from '../../src/api';
import { useAuthorisation, useAxios } from '../../src/hooks';
import { genAdminMenuItems } from '../../src/constants';
import { FormCategoryCreate, FormCategoryManage } from '../../src/containers';

const AdminProjectCategories = () => {
	useAuthorisation();

	const { axiosAuth } = useAxios();
	const { isLoading, data } = useQuery('categories', genGetCategories(axiosAuth));
	const categories = data?.data?.payload ?? [];

	return (
		<>
			<Header
				title="Administration Panel"
				subtitle="tools for geeks"
				tabs={genAdminMenuItems()}
				tabActive="categories"
			/>

			<div className="row">
				<div className="col">
					<h2>Categories</h2>
					{isLoading && <Loading />}
					{categories.map((category) => (
						<FormCategoryManage key={category.id} id={category.id} categoryName={category.name} />
					))}
				</div>
				<div className="col">
					<h2>Create a category</h2>
					<FormCategoryCreate />
				</div>
			</div>
		</>
	);
};

export default AdminProjectCategories;
