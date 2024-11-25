import { TaskStatus } from '@/api/models/task/enum';
import {Joi, Segments} from 'celebrate';

const taskStatusValues = Object.values(TaskStatus);

export const TaskInput = {
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi?.string().max(100)?.required(),
        status: Joi.string().valid(...taskStatusValues).required(),
        dueDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
    })
}

export const UpdateTaskValidation = {
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string().max(100),
        status: Joi.string().valid(...taskStatusValues),
        dueDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/)
    }).or('title', 'description', 'status', 'dueDate')
}



