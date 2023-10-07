import { IRecipe } from "./models/Recipe";
import { RecipeCard } from "./types/custom";
import { IUser } from "./models/User";
import { Stars } from "./types/custom/frontend-types";
import { NextFunction, Request, Response } from "express";

function mean(arr: number[]): number {
	return arr.reduce((prevVal, currVal) => prevVal + currVal, 0) / arr.length;
}

export function toRecipeCard(recipe: IRecipe, user?: IUser): RecipeCard {
	// calculate stars of the recipe
	// stars are just mean of all the reviews rating that the recipe has gotten
	const stars = (Math.round(
		mean(recipe.reviews?.map(review => review.rating))
	) || 0) as Stars;

	const recipeObj = {
		...recipe,
		stars,
		id: recipe._id.toString(),
		totalCookTime: recipe.cookTime + recipe.prepTime,
	};

	if (!user)
		return {
			...recipeObj,
			bookmarked: false,
		};

	// find out if the recipe is bookmarked by user or not
	const bookmarked = !!user.bookmarkedRecipes.find(bookmarked =>
		bookmarked.equals(recipe._id)
	);
	return {
		...recipeObj,
		bookmarked,
	};
}

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	req.user ? next() : res.redirect("/auth/login");
}

export function inputRecipeData(
	title: string,
	desc: string,
	image: string,
	prepTime: string,
	cookTime: string,
	category: string,
	region: string,
	servings: string,
	ingredientQuantityNum: string | string[],
	ingredientQuantitySuffix: string | string[],
	ingredientName: string | string[],
	tags: string | string[],
	calorie: string,
	protein: string,
	carbs: string,
	fat: string,
	steps: string | string[],
	notes?: string
) {
	return {
		title: capitalize(title),
		desc: desc,
		prepTime: +prepTime,
		cookTime: +cookTime,
		servings: +servings,
		steps:
			typeof steps === "string"
				? [steps.trim()]
				: steps.map(steps => steps.trim()),
		notes: notes ? notes.trim() : "",
		nutrition: {
			calorie: calorie ? +calorie : null,
			fat: fat ? +fat : null,
			carbs: carbs ? +carbs : null,
			protein: protein ? +protein : null,
		},
		tags: typeof tags === "string" ? [tags] : tags,
		image: image,
		category: category,
		region: region,
		ingredients:
			typeof ingredientName === "string"
				? [
						{
							name: ingredientName,
							quantity: {
								num: ingredientQuantityNum,
								suffix: ingredientQuantitySuffix,
							},
						},
				  ]
				: ingredientName.map((ingName, index) => ({
						name: ingName,
						quantity: {
							num: ingredientQuantityNum.at(index),
							suffix: ingredientQuantitySuffix.at(index),
						},
				  })),
	};
}

export function capitalize(sentence: string): string {
	return sentence
		.toLowerCase()
		.split(" ")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
