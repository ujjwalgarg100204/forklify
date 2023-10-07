import { Router } from "express";
import passport from "passport";

const LinkedInRouter = Router();

LinkedInRouter.get("/", passport.authenticate("linkedin"));

LinkedInRouter.get(
	"/redirect",
	passport.authenticate("linkedin"),
	(req, res) => {
		res.redirect("/");
	}
);

export default LinkedInRouter;
