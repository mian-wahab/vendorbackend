import { UserRoles } from '@/api/models/user/enum';
import {Joi, Segments} from 'celebrate';

const userRolesValues = Object.values(UserRoles);

export const UserInput = {
    [Segments.BODY]: Joi.object().keys({
        userName: Joi.string().min(3).max(7).required(),
        fullName: Joi.string().required(),
        email: Joi?.string()?.email()?.required(),
        password: Joi?.string()?.min(5)?.max(30)?.required(),
    })
}

export const AddNewUser = {
    [Segments.BODY]: Joi.object().keys({
        userName: Joi.string().min(3).max(7).required(),
        fullName: Joi.string().required(),
        email: Joi?.string()?.email()?.required(),
        password: Joi?.string()?.min(5)?.max(30)?.required(),
        role: Joi.string().valid(...userRolesValues).required(),
    })
}

