import { Router } from "express";
import { getAllRecipes, getRecipe } from "../data/Recipes";
import { getAllRecipeCollections } from "../data/RecipesCollection";
import UserModel from "../models/User";
import { isAuthenticated } from "../utils";

const ApiRouter = Router();

ApiRouter.get("/r/:id", async (req, res) => {
	const { id } = req.params;
	const foundRecipe = await getRecipe(id);
	res.status(200).json({ foundRecipe });
});

ApiRouter.get("/", isAuthenticated, async (req, res) => {
	const recipeData = await getAllRecipes();
	const recipeCollectionData = await getAllRecipeCollections();
	const userData = await UserModel.find({}).lean().exec();

	res.status(200).json({
		recipe: recipeData,
		recipeCollection: recipeCollectionData,
		user: userData,
	});
});

export default ApiRouter;
