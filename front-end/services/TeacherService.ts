const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');
  return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getAllTeachers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teachers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

const updateLearningPath = async (teacherId: number, learningPath: string) => {
  const token = getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teachers/${teacherId}/learningpath?learningPath=${learningPath}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
