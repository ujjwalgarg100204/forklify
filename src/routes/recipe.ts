import { Router } from "express";
import {
	getAllRecipes,
	getPopularRecipes,
	getRecipe,
	searchRecipe,
	searchRecipesUsingFilters,
} from "../data/Recipes";
import { categoriesIcons, filterList } from "../data/StaticData";
import { toRecipeCard } from "../utils";
import RecipeModel, { IRecipe } from "../models/Recipe";

const RecipeRouter = Router();

RecipeRouter.get("/", async (req, res) => {
	const recipes = (await getPopularRecipes()).map(recipe =>
		toRecipeCard(recipe, req.user)
	);

	res.render("pages/recipe/index", {
		recipes,
		categories: categoriesIcons,
		user: req.user,
	});
});
// protected routes
/*RecipeRouter.get("/create", (req, res) => {
	res.redirect("/u/recipe/create");
});*/
RecipeRouter.get("/create", (req, res) => {
	res.redirect("/u/recipes/create");
});

RecipeRouter.get("/update/:id", (req, res) => {
	const recipeID = req.params.id;
	res.redirect(`/u/recipe/update/${recipeID}`);
});

// public routes
RecipeRouter.get("/search", (req, res) => {
	const filters = filterList;
	res.render("pages/recipe/search", {
		filters,
		user: req.user,
		resultRecipes: [],
		showResults: false,
	});
});

RecipeRouter.post("/search/results", async (req, res) => {
	const filters = filterList;
	const { userFilters } = req.body;

	let resultRecipes: IRecipe[];
	if (typeof userFilters === "undefined")
		resultRecipes = await getAllRecipes();
	else if (typeof userFilters === "string") {
		const [filterTitle, filterValue] = userFilters.split("_") as [
			string,
			string
		];

		switch (filterTitle) {
			case "time":
				let maxTime;
				if (filterValue === "under 15 min") maxTime = 900;
				else if (filterValue === "under 30 min") maxTime = 1800;
				else maxTime = 3600;

				resultRecipes = await RecipeModel.find({
					$expr: {
						$lt: [{ $add: ["$cookTime", "$prepTime"] }, maxTime],
					},
				})
					.lean()
					.exec();
				break;
			case "dish type":
				resultRecipes = await RecipeModel.find({
					category: filterValue,
				})
					.lean()
					.exec();
				break;
			case "regions":
				resultRecipes = await RecipeModel.find({
					region: filterValue,
				})
					.lean()
					.exec();
				break;
			default:
				resultRecipes = await RecipeModel.find({
					tags: { $in: [filterValue] },
				})
					.lean()
					.exec();
		}
	} else
		resultRecipes = await searchRecipesUsingFilters(
			userFilters.map((filter: string) => filter.split("_"))
		);

	res.render("pages/recipe/search", {
		user: req.user,
		showResults: true,
		resultRecipes: resultRecipes.map(recipe => toRecipeCard(recipe)),
		filters,
	});
});

RecipeRouter.get("/search/search-bar/:query", async (req, res) => {
	const { query } = req.params;
	try {
		const foundRecipes = (
			query === "all" ? await getAllRecipes() : await searchRecipe(query)
		).map(recipe => toRecipeCard(recipe));
		res.status(200).json({
			error: null,
			success: true,
			foundRecipes,
		});
	} catch (e) {
		res.status(404).json({
			error: e,
			success: false,
			foundRecipes: [],
		});
	}
});

RecipeRouter.get("/popular", async (req, res) => {
	const popularRecipes = (await getPopularRecipes()).map(recipe =>
		toRecipeCard(recipe)
	);

	res.render("pages/recipe/popular", {
		recipes: popularRecipes,
		user: req.user,
	});
});

RecipeRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const recipeData = toRecipeCard((await getRecipe(id)) as IRecipe, req.user);

	const recipes = (await getPopularRecipes()).map(recipe =>
		toRecipeCard(recipe)
	);

	res.render("pages/recipe/[id]", {
		recipe: recipeData,
		user: req.user,
		recommendedRecipes: recipes,
		servings: 4,
	});
});

export default RecipeRouter;
