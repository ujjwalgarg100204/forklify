import { Router } from "express";
import AuthRoutes from "./auth";
import RecipeRouter from "./recipe";
import UserRouter from "./user";
import CollectionRouter from "./collection";
import { getPopularRecipes } from "../data/Recipes";
import {
	categoriesIcons,
	developersProfiles,
	howItWorksData,
} from "../data/StaticData";
import { CategoriesIcons, HowItWorksType, ProfileCard } from "../types/custom";
import { toRecipeCard } from "../utils";
import ApiRouter from "./api";

const IndexRouter = Router();

// Import all other routes
IndexRouter.use("/auth", AuthRoutes);
IndexRouter.use("/r", RecipeRouter);
IndexRouter.use("/c", CollectionRouter);
IndexRouter.use("/u", UserRouter);
IndexRouter.use("/api", ApiRouter)

IndexRouter.get("/", async (req, res) => {
	// static data
	const howItWorks: HowItWorksType[] = howItWorksData;
	const categoriesWithIcons: CategoriesIcons[] = categoriesIcons;

	// data from database
	const recommendedRecipes = (await getPopularRecipes()).map(recipe =>
		toRecipeCard(recipe, req.user)
	);
	res.render("pages/index", {
		recommendedRecipes,
		howItWorks,
		categoriesWithIcons,
		user: req.user,
	});
});

IndexRouter.get("/about", (req, res) => {
	const profiles: ProfileCard[] = developersProfiles;
	res.render("pages/about", { profiles, user: req.user });
});

IndexRouter.get("/conditions", (req, res) => {
	res.render("pages/conditions", { user: req.user });
});

IndexRouter.get("/privacy-policy", (req, res) => {
	res.render("pages/privacy-policy", { user: req.user });
});

export default IndexRouter;
