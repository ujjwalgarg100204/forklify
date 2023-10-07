import Recipe from "../models/Recipe";
import RecipeModel, {
	IRecipe,
	RecipeCategories,
	Regions,
} from "../models/Recipe";
import { BookmarkResponse, DeleteResponse, MongoID } from "../types/custom";
import { Types } from "mongoose";
import User, { IUser } from "../models/User";
import RecipeCollection from "../models/RecipeCollection";

export async function getPopularRecipes(): Promise<IRecipe[]> {
	// popular recipe is defined as a recipe with most bookmarkCount and higher
	// rating
	return await Recipe.find()
		.sort({ bookmarkCount: -1, "reviews.rating": -1 })
		.limit(20)
		.lean(true)
		.exec();
}

export async function getRecipe(id: MongoID): Promise<IRecipe | null> {
	return await Recipe.findById(id).lean(true).exec();
}

export async function getAllBookmarkedRecipes(user: IUser): Promise<IRecipe[]> {
	return await Promise.all(
		user.bookmarkedRecipes.map(
			async recipeID => (await getRecipe(recipeID))!
		)
	);
}

export async function toggleBookmarkRecipe(
	recipeId: MongoID,
	user: IUser
): Promise<BookmarkResponse> {
	// bookmarking means two things, increasing bookmarkCount in recipe and adding id of Recipe in
	// users bookmarkedRecipes
	if (user.bookmarkedRecipes.find(recipeID => recipeID.equals(recipeId))) {
		// user has already bookmarked the recipe, so remove from bookmark
		try {
			// decrement recipe bookmark count
			await Recipe.updateOne(
				{ _id: recipeId },
				{ $inc: { bookmarkCount: -1 } }
			).exec();

			// remove recipe from bookmarkedRecipes collection
			await User.updateOne(
				{ _id: user._id },
				{ $pull: { bookmarkedRecipes: recipeId } }
			);

			return { success: true, error: null, bookmarked: false };
		} catch (e) {
			return { success: false, error: e, bookmarked: true };
		}
	}

	// user doesn't have the recipe already bookmarked
	try {
		// increment recipe bookmark count
		await Recipe.updateOne(
			{ _id: recipeId },
			{ $inc: { bookmarkCount: 1 } }
		).exec();

		// add recipe to bookmarkedRecipes collection
		await User.updateOne(
			{ _id: user._id },
			{ $push: { bookmarkedRecipes: recipeId } }
		);

		return { success: true, error: null, bookmarked: true };
	} catch (e) {
		return { success: false, error: e, bookmarked: false };
	}
}

export async function deleteRecipe(id: MongoID): Promise<DeleteResponse> {
	// deleting a recipe means deleting the recipe across whole database

	try {
		await RecipeCollection.updateMany(
			{ $where: "this.recipes.length > 0" },
			{ $pull: { recipes: id } }
		).exec();

		await User.updateMany(
			{
				$where: "this.bookmarkedRecipes.length > 0 || this.recipes.length > 0",
			},
			{ $pull: { bookmarkedRecipes: id, recipes: id } }
		).exec();

		await Recipe.deleteOne({ _id: id }).exec();

		return {
			success: true,
			error: null,
			deleted:1,
		};
	} catch (e) {
		return {
			success: false,
			error: e,
			deleted:0,
		};
	}
}

export async function getAllRecipes(): Promise<IRecipe[]> {
	return await Recipe.find({}).lean().exec();
}

export async function searchRecipe(query: string): Promise<IRecipe[]> {
	return await Recipe.find({
		$or: [
			{ title: { $regex: query, $options: "i" } }, // case-insensitive search for title
			{ "ingredients.name": { $regex: query, $options: "i" } }, // case-insensitive search for ingredients
			{ tags: { $in: [query], $regex: query, $options: "i" }}, // case-insensitive search for tags
	],
	})
		.lean()
		.exec();
}

interface Filter {
	cookTime: number;
	recipeCategory: string[];
	regions: string[];
	tags: string[];
}

export async function searchRecipesUsingFilters(
	filters: [[string, string]]
): Promise<IRecipe[]> {
	// manage time constraint part
	const filterObj: Filter = {
		// filter time filter among all the filters, convert
		// it to seconds and if its parameter is not given then use the
		// max_value of number, cuz the search always <, so it would select all the values
		cookTime: filters
			.filter(filter => filter[0] === "time")
			.map(filter => {
				switch (filter[1]) {
					case "under 15 min":
						return 900;
					case "under 30 min":
						return 1800;
					case "under 60 min":
						return 3600;
					default:
						return 0;
				}
			})
			.reduce(
				(previousValue, currentValue) =>
					previousValue > currentValue ? previousValue : currentValue,
				0
			),
		// get all recipe categories selected by the user
		recipeCategory: filters
			.filter(filter => filter[0] === "dish type")
			.map(filter => filter[1]),

		// get all regions selected by the user
		regions: filters
			.filter(filter => filter[0] === "regions")
			.map(filter => filter[1]),

		// select everything except above types, and put them in tags
		tags: filters
			.filter(
				filter => !["dish_type", "regions", "time"].includes(filter[0])
			)
			.map(filter => filter[1]),
	};

	return await RecipeModel.find({
		$or: [
			{ category: { $in: filterObj.recipeCategory } },
			{ region: { $in: filterObj.regions } },
			{ tags: { $in: filterObj.tags } },
			{
				$expr: {
					$lt: [
						{ $add: ["$cookTime", "$prepTime"] },
						filterObj.cookTime,
				],
			},
		},
	],
	})
		.lean()
		.exec();

	// diet can search $in operator in tag array
	// category,region can be done using $in operator or $equal operator
}

export async function saveRecipe(recipe: {
	title: string;
	author: Types.ObjectId;
	desc: string;
	ingredients: {
		name: string;
		quantity: {
			num: number;
			suffix: string;
		};
	}[];
	category: RecipeCategories;
	steps: string[];
	tags: string[];
	image: string;
	video?: string;
	region: Regions;
	servings?: number;
	prepTime: number;
	cookTime: number;
	notes?: string;
	nutrition?: {
		calories?: number;
		protein?: number;
		carb?: number;
		fat?: number;
	};
}) {
	return await new RecipeModel({
		...recipe,
	}).save();
}
