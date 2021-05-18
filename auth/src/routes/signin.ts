import express, { Request, Response } from 'express';
import { body} from "express-validator";
import jwt from 'jsonwebtoken';
import 'express-async-errors'


import { validateRequest } from '@armorkingtickets/common';
import { User } from '../models/user';
import { BadRequesterror } from '@armorkingtickets/common';
import { Password } from '../services/password';


const router = express.Router();

router.post('/api/users/signin',[body('email').isEmail()
.withMessage('Email must be valid'),
body('password').trim().notEmpty().withMessage("Must supply a password")
],validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser) {
        throw new BadRequesterror('Invalid credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if(!passwordsMatch) {
        throw new BadRequesterror('Invalid credentials');
    }
    const existingUserJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);
    req.session = {
        jwt: existingUserJwt
    }
    res.status(200).send(existingUser);
});

export {router as signinRouter}