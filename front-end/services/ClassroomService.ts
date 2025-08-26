const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser')
  return loggedInUserString ? JSON.parse(loggedInUserString).token : ''
}

const createClassroom = (name: string) => {
  const token = getToken()

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/classrooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
}

const ClassroomService = { createClassroom }

export default ClassroomService
