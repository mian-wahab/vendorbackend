import { Router } from 'express';
import { loginWithCredentials as loginWithCredentialsValidator, UserInput } from '@/validators';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import { RegistrationHandler, loginWithCredentials } from '../controllers';

const router = Router();



router.post('/login', celebrate(loginWithCredentialsValidator), AsyncWrapper(loginWithCredentials));
router.post('/registration', celebrate(UserInput), AsyncWrapper(RegistrationHandler));

export default router;

