import LearningPath from '@components/learning-path';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
  }, []);

  const isAdmin = loggedInUser?.role === 'admin';

  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Learning path</th>
            </tr>
          </thead>
          <tbody>
            {teachers?.map((t) => (
              <tr key={t.id}>
                <td>{`${t.user.firstName} ${t.user.lastName}`}</td>
                <td>
                  {isAdmin ? (
                    <LearningPath teacherId={t.id} learningPath={t.learningPath} />
                  ) : (
                    t.learningPath
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TeacherOverview;
