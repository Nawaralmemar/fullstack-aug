import teacherDb from '../repository/teacher.db';
import { Teacher } from '../model/teacher';
import { UnauthorizedError } from 'express-jwt';

const getAllTeachers = async (): Promise<Teacher[]> => teacherDb.getAllTeachers();

const updateLearningPath = async (
    teacherId: number,
    learningPath: string,
    currentUserRole?: string
): Promise<Teacher> => {
    if (!currentUserRole) {
        throw new UnauthorizedError('credentials_required', {
            message: 'Missing user role.',
        });
    }
    if (currentUserRole !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'Only admins can update learning paths.',
        });
    }
    const validLearningPaths = ['Infrastructure', 'Software development', 'Cybersecurity'];
    if (!validLearningPaths.includes(learningPath)) {
        throw new Error('Invalid learning path. Must be one of: Infrastructure, Software development, Cybersecurity');
    }

    return teacherDb.updateLearningPath(teacherId, learningPath);
};

export default { getAllTeachers, updateLearningPath };
