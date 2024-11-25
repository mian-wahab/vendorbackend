import { Router } from "express";
const router = Router();

import auth from './auth';
import user from './user';
import task from './task';
import ftp from './ftp';
import vendor from './vendor';
import convert from './convertedFile';
import cron from './cron'

import { Authentication, Authorization } from "@/middlewares";
import { UserRoles } from "../models/user/enum";
import { AsyncWrapper } from "@/utils";
import { downloadConvertedFile } from "../controllers/convertedfile";

router.use('/auth', auth);
router.use('/user',
//  Authentication, Authorization([UserRoles.ADMIN]),
  user);
router.use('/task',
//  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),
  task);
router.use('/ftp',
    //  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),
 ftp);
router.use('/vendor',
//  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),
  vendor);
router.use('/convert', Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]), convert);
router.use('/file/download/:fileName',  AsyncWrapper(downloadConvertedFile));

 router.use('/cron',
  //  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]), 
  cron)



export default router;