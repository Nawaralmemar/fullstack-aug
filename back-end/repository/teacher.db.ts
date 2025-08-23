import database from '../util/database';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        const teachers = await database.teacher.findMany({
            include: {
                user: true,
            },
        });
        return teachers.map(teacher => Teacher.from(teacher));
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const updateLearningPath = async (teacherId: number, learningPath: string): Promise<Teacher> => {
    try {
        const updatedTeacher = await database.teacher.update({
            where: { id: teacherId },
            data: { learningPath },
            include: {
                user: true,
            },
        });
        return Teacher.from(updatedTeacher);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTeachers,
    updateLearningPath,
};
