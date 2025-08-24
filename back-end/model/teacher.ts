import { User } from './user';
import { Teacher as TeacherPrisma, User as UserPrisma } from '@prisma/client';

export class Teacher {
    readonly id?: number;
    readonly user: User;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly learningPath: string;

    // TODO: Add validation for the teacher object later
    constructor(teacher: {
        id?: number;
        user: User;
        createdAt?: Date;
        updatedAt?: Date;
        learningPath: string;
    }) {
        this.id = teacher.id;
        this.user = teacher.user;
        this.createdAt = teacher.createdAt;
        this.updatedAt = teacher.updatedAt;
        this.learningPath = teacher.learningPath;
    }

    get fullName(): string {
        return `${this.user.firstName} ${this.user.lastName}`;
    }

    static from(teacherPrisma: TeacherPrisma & { user: UserPrisma }): Teacher {
        return new Teacher({
            id: teacherPrisma.id,
            user: User.from(teacherPrisma.user),
            createdAt: teacherPrisma.createdAt,
            updatedAt: teacherPrisma.updatedAt,
            learningPath: teacherPrisma.learningPath,
        });
    }
}
