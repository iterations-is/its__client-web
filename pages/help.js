import { Header, Loading } from '../src/components';
import { useAuthorisation, useAxios } from '../src/hooks';
import { useMutation, useQuery } from 'react-query';
import { genDeleteSelf, genGetSelf } from '../src/api';

const Help = () => {
	useAuthorisation();

	const { axiosAuth } = useAxios();
	const selfInfo = useQuery('selfInfo', genGetSelf(axiosAuth));
	const selfDelete = useMutation(genDeleteSelf(axiosAuth));

	return (
		<>
			<Header title="Help" subtitle="some useful information" />
			<h2>Account information (JSON)</h2>
			{selfInfo.isLoading && <Loading />}
			<pre>
				<code>{JSON.stringify(selfInfo.data?.data?.payload, null, 2)}</code>
			</pre>

			<h2>Remove account</h2>
			<button
				className="btn btn-primary"
				onClick={() => {
					selfDelete.mutate();
				}}>
				Delete
			</button>
		</>
	);
};

export default Help;
