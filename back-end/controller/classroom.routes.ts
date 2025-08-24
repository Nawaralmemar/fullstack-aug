/**
 * @swagger
 *   components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 *      ClassroomInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Classroom name.
 */
import express, { NextFunction, Request, Response } from 'express'
import classroomService from '../service/classroom.service'

const classroomRouter = express.Router()

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassroomInput'
 *     responses:
 *       201:
 *         description: The created classroom
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - JWT token error
 *       409:
 *         description: Classroom already exists
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body as { name: string }
        const currentUserRole = (req as any).auth?.role as string | undefined
        const created = await classroomService.createClassroom(name as string, currentUserRole)
        res.status(201).json(created)
    } catch (error) {
        next(error)
    }
})

export { classroomRouter }
