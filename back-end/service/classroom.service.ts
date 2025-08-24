import { UnauthorizedError } from 'express-jwt'
import { Classroom } from '../model/classroom'
import classroomDb from '../repository/classroom.db'
import { DuplicateError } from '../util/errors'

const createClassroom = async (name: string, currentUserRole?: string): Promise<Classroom> => {
    if (!currentUserRole) {
        throw new UnauthorizedError('credentials_required', { message: 'Missing user role.' })
    }
    if (currentUserRole !== 'admin') {
        throw new UnauthorizedError('credentials_required', { message: 'Only admins can add classrooms.' })
    }

    const validated = new Classroom({ name })

    const existing = await classroomDb.getClassroomByName(validated.name)
    if (existing) {
        throw new DuplicateError('Classroom already exists')
    }

    return classroomDb.createClassroom(validated.name)
}

export default { createClassroom }
