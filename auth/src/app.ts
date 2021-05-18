import { errorHandler } from "@armorkingtickets/common";
import { NotFoundError } from "@armorkingtickets/common";
import cookieSession = require("cookie-session");
import { json } from "body-parser";
import express = require("express");
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async(req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);
export {app};