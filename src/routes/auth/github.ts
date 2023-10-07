import { Router } from "express";
import passport from "passport";

const GitHubRouter = Router();

GitHubRouter.get("/", passport.authenticate("github"));

GitHubRouter.get("/redirect", passport.authenticate("github"), (req, res) => {
	res.redirect("/");
});

export default GitHubRouter;
