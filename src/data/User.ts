import UserModel, { IUser } from "../models/User";
import { MongoID } from "../types/custom";
import RecipeModel, { IRecipe } from "../models/Recipe";

export async function getUserData(userID: MongoID): Promise<IUser | null> {
	return await UserModel.findById(userID).exec();
}

export async function getRecipesOfUser(
	userID: MongoID
): Promise<IRecipe[] | null> {
	return await RecipeModel.find({ author: userID }).lean().exec();
}
