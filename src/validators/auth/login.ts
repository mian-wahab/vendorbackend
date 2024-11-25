import { Joi, Segments } from 'celebrate';


export const loginWithCredentials = {
    [Segments.BODY]: Joi?.object()?.keys({
        email: Joi?.string()?.required(),
        password: Joi?.string()?.min(5)?.max(30)?.required(),
    }),
}