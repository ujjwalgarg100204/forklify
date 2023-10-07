import GitHubProfile from "./github-profile";
import { Types } from "mongoose";
import { BookmarkResponse, DeleteResponse } from "./api-return-types";
import {
	HowItWorksType,
	ProfileCard,
	RecipeCard,
	CategoriesIcons,
	FilterListItem,
	RecipeCollectionDetailed,
} from "./frontend-types";

type MongoID = string | Types.ObjectId;

export {
	GitHubProfile,
	MongoID,
	RecipeCard,
	ProfileCard,
	HowItWorksType,
	CategoriesIcons,
	FilterListItem,
	RecipeCollectionDetailed,
	BookmarkResponse,
	DeleteResponse,
};
