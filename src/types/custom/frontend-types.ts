import { IRecipe, RecipeCategories } from "../../models/Recipe";
import { IRecipeCollection } from "../../models/RecipeCollection";

export type Stars = 1 | 2 | 3 | 4 | 5;

export interface RecipeCard extends IRecipe {
	id: string;
	bookmarked: boolean;
	totalCookTime: number;
	stars: Stars;
}

export interface ProfileCard {
	name: string;
	desc: string;
	designation: string;
	imagePath: string;
	socials: {
		github: string;
		instagram: string;
		linkedin: string;
	};
}

export interface HowItWorksType {
	title: string;
	text: string;
}

export interface CategoriesIcons {
	svg: string;
	category: RecipeCategories;
}

export interface FilterListItem {
	title: string;
	filters: string[];
}

export interface RecipeCollectionDetailed extends IRecipeCollection {
	recipesContained: RecipeCard[];
}
