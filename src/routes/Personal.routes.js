import {Router} from "express";
import { getpersonal, postpersonal, putpersonal, deletetpersonal, getpersona } from "../controllers/personal.controller.js";

const router = Router()

router.get('/personal', getpersonal)
router.get('/personal/:id', getpersona)
router.post('/personal', postpersonal)
router.put('/personal/:id', putpersonal)
router.delete('/personal/:id', deletetpersonal)


export default router