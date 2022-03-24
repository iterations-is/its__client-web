import { useRouter } from 'next/router';
import { Header } from '../../../../src/components';
import { useQuery } from 'react-query';
import { genGetProject } from '../../../../src/api';
import { genProjectMenuItems } from '../../../../src/constants';
import { useAxios } from '../../../../src/hooks';

const ProjectSettings = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { axiosAuth } = useAxios();
  const project = useQuery('project', genGetProject(axiosAuth));

  return (
    <>
      <Header
        title="Project name"
        subtitle="team and vacancies"
        tabs={genProjectMenuItems(projectId)}
        tabActive="team"
      />
      <h2>Set</h2>
    </>
  );
};

export default ProjectSettings;
