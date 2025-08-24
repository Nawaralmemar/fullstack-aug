import { Classroom as ClassroomPrisma } from '@prisma/client'

export class Classroom {
    readonly id?: number
    readonly name: string
    readonly createdAt?: Date
    readonly updatedAt?: Date

    constructor(classroom: { id?: number; name: string; createdAt?: Date; updatedAt?: Date }) {
        this.validate(classroom)

        this.id = classroom.id
        this.name = classroom.name.trim()
        this.createdAt = classroom.createdAt
        this.updatedAt = classroom.updatedAt
    }

    private validate(classroom: { name: string }) {
        if (!classroom.name?.trim()) {
            throw new Error('Name is required')
        }
    }

    static from(classroomPrisma: ClassroomPrisma): Classroom {
        return new Classroom({
            id: classroomPrisma.id,
            name: classroomPrisma.name,
            createdAt: classroomPrisma.createdAt,
            updatedAt: classroomPrisma.updatedAt,
        })
    }
}
