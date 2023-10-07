import { Router } from "express";
import passport from "passport";

const GoogleRouter = Router();

GoogleRouter.get(
	"/",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

GoogleRouter.get("/redirect", passport.authenticate("google"), (req, res) => {
	res.redirect("/");
});

export default GoogleRouter;
