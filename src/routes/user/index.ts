import { Router } from "express";
import { getRecipesOfUser } from "../../data/User";

import RecipeUserRouter from "./recipe";
import CollectionUserRouter from "./collection";
import { isAuthenticated, toRecipeCard } from "../../utils";
import { IRecipe } from "../../models/Recipe";
import { getRecipeCollectionOfUser } from "../../data/RecipesCollection";

const UserRouter = Router();

UserRouter.use(isAuthenticated);

UserRouter.use("/collections", CollectionUserRouter);
UserRouter.use("/recipes", RecipeUserRouter);

UserRouter.get("/", (req, res) => {
	res.redirect("/u/dashboard");
});

UserRouter.get("/dashboard", async (req, res) => {
	const userRecipes = (
		(await getRecipesOfUser(req.user!._id)) as IRecipe[]
	).map(recipe => toRecipeCard(recipe));
	const userCollections = await getRecipeCollectionOfUser(req.user!._id);
	const commentsNum = userRecipes.reduce(
		(previousValue, currentValue) =>
			previousValue +
			currentValue.reviews.filter(review =>
				review.user.equals(req.user!._id)
			).length,
		0
	);

	res.render("pages/user/dashboard", {
		recipes: userRecipes,
		collections: userCollections,
		user: req.user,
		commentsNum,
	});
});

export default UserRouter;
