import { Router } from "express";
import GoogleRouter from "./google";
import GitHubRouter from "./github";
import LinkedInRouter from "./linkedin";

const AuthRoutes = Router();

AuthRoutes.use("/google", GoogleRouter);
AuthRoutes.use("/github", GitHubRouter);
AuthRoutes.use("/linkedin", LinkedInRouter);

AuthRoutes.get("/login", (req, res) => {
	// if already logged in, then just go to dashboard.ejs
	req.user
		? res.redirect("/")
		: res.render("pages/auth/login", { user: req.user });
});

AuthRoutes.get("/confirm-logout", (req, res) => {
	res.render("pages/auth/confirm-logout");
	// res.redirect("/");
});
AuthRoutes.get("/logout", (req, res) => {
	req.user ? req.logout(() => res.redirect("/")) : res.redirect("/");
});

export default AuthRoutes;
