import { Joi, Segments } from 'celebrate';
import { Types } from 'mongoose';


export const verifyEmailOnly = {
    [Segments.BODY]: Joi?.object()?.keys({
        email: Joi?.string()?.email()?.required(),
    }),
}

export const objectId = Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
}, 'MongoDB ObjectId');

export const verifyMongooseId = {
    [Segments.PARAMS]: Joi.object().keys({
        id: objectId.required()
    })
}
