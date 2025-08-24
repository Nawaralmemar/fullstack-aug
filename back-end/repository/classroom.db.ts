import database from '../util/database'
import { Classroom } from '../model/classroom'

const createClassroom = async (name: string): Promise<Classroom> => {
    try {
        const classroom = await database.classroom.create({
            data: { name },
        })
        return Classroom.from(classroom)
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getClassroomByName = async (name: string): Promise<Classroom | null> => {
    try {
        const classroom = await database.classroom.findUnique({ where: { name } })
        return classroom ? Classroom.from(classroom) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

export default { createClassroom, getClassroomByName }
