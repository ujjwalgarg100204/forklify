import { Router } from "express";
import { getRecipesOfUser } from "../../data/User";
import RecipeModel, {
	IRecipe,
	RecipeCategories,
	Regions,
} from "../../models/Recipe";
import {
	deleteRecipe,
	getAllBookmarkedRecipes,
	getRecipe,
	toggleBookmarkRecipe,
} from "../../data/Recipes";
import { inputRecipeData, toRecipeCard } from "../../utils";

const RecipeUserRouter = Router();

// get all recipes of user
RecipeUserRouter.get("/", async (req, res) => {
	const recipes = ((await getRecipesOfUser(req.user!._id)) as IRecipe[]).map(
		recipe => toRecipeCard(recipe)
	);
	res.render("pages/user/recipes", { recipes, user: req.user });
});

// get bookmarked recipes of user
RecipeUserRouter.get("/saved", async (req, res) => {
	const bookmarkedRecipes = (await getAllBookmarkedRecipes(req.user!)).map(
		recipe => toRecipeCard(recipe)
	);
	res.render("pages/recipe/saved", { bookmarkedRecipes, user: req.user });
});

RecipeUserRouter.get("/create", (req, res) => {
	res.render("pages/user/recipes/create-edit", {
		user: req.user,
		categories: Object.values(RecipeCategories),
		regions: Object.values(Regions),
		editable: false,
		recipe: {},
	});
});

RecipeUserRouter.post("/create", async (req, res) => {
	const formInputData = inputRecipeData(
		req.body.title,
		req.body.desc,
		req.body.image,
		req.body.prepTime,
		req.body.cookTime,
		req.body.category,
		req.body.region,
		req.body.servings,
		req.body.ingredientQuantityNum,
		req.body.ingredientQuantitySuffix,
		req.body.ingredientName,
		req.body.tags,
		req.body.calorie,
		req.body.protein,
		req.body.carbs,
		req.body.fat,
		req.body.steps,
		req.body.notes
	);

	try {
		const createdRecipe = await new RecipeModel({
			...formInputData,
			author: req.user!._id,
			bookmarkCount: 0,
			reviews: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		}).save();
		console.log(createdRecipe);
	} catch (err) {
		console.log(err);
	} finally {
		res.redirect("/u/recipes");
	}
});

RecipeUserRouter.get("/search", (req, res) => {
	res.redirect("/r/search");
});
RecipeUserRouter.get("/edit/:id", async (req, res) => {
	const { id } = req.params;
	const recipe = (await getRecipe(id)) as IRecipe;
	res.render("pages/user/recipes/create-edit", {
		user: req.user,
		categories: Object.values(RecipeCategories),
		regions: Object.values(Regions),
		recipe: toRecipeCard(recipe),
		editable: true,
	});
});

RecipeUserRouter.post("/edit/:id", async (req, res) => {
	const { id } = req.params;
	console.log(req.body);
	const formInputData = inputRecipeData(
		req.body.title,
		req.body.desc,
		req.body.image,
		req.body.prepTime,
		req.body.cookTime,
		req.body.category,
		req.body.region,
		req.body.servings,
		req.body.ingredientQuantityNum,
		req.body.ingredientQuantitySuffix,
		req.body.ingredientName,
		req.body.tags,
		req.body.calorie,
		req.body.protein,
		req.body.carb,
		req.body.fat,
		req.body.steps,
		req.body.notes
	);
	console.log(await RecipeModel.find({ _id: id }).lean().exec());
	console.log(formInputData);

	try {
		const updateRecipe = await RecipeModel.updateOne(
			{ _id: id },
			{
				$set: {
					...formInputData,
					updatedAt: new Date(),
				},
			}
		)
			.lean()
			.exec();
		console.log(updateRecipe);
	} catch (err) {
		console.log(err);
	} finally {
		res.redirect("/u/recipes");
	}
});

RecipeUserRouter.get("/delete/:id", async (req, res) => {
	const { id } = req.params;
	const { confirmation } = req.query;
	if (confirmation) {
		await deleteRecipe(id);
		res.redirect("/u/recipes");
		return;
	}
	const recipeDetail = await getRecipe(id);

	res.render("components/confirm", {
		prompt: `You are about to delete *${recipeDetail?.title}* Recipe`,
		yesMessage: "Are you sure to delete this recipe?",
		yesLink: `/u/recipes/delete/${id}?confirmation=true`,
	});
});

RecipeUserRouter.get("/bookmark/:id", async (req, res) => {
	const { id } = req.params;
	console.log(req.user);
	const response = await toggleBookmarkRecipe(id, req.user!);
	res.status(response.error ? 500 : 200).json(response);
});

export default RecipeUserRouter;
