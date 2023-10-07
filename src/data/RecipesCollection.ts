import RecipeCollectionModel, {
	IRecipeCollection,
} from "../models/RecipeCollection";

import { DeleteResponse, MongoID } from "../types/custom";
import { Types } from "mongoose";
import User from "../models/User";

export async function getRecipeCollection(
	collectionID: MongoID
): Promise<IRecipeCollection | null> {
	return await RecipeCollectionModel.findById(collectionID).lean().exec();
}

export async function updateRecipeCollection(
	id: string,
	title: string,
	desc: string,
	image: string
) {
	return RecipeCollectionModel.updateOne(
		{ _id: id },
		{ title, desc, image, updatedAt: new Date() }
	);
}

export async function getRecipeCollectionOfUser(
	userID: MongoID
): Promise<IRecipeCollection[]> {
	return await RecipeCollectionModel.find({ author: userID }).lean().exec();
}

export async function insertRecipeCollection(
	userID: string | Types.ObjectId,
	title: string,
	desc: string,
	image: string
) {
	return await new RecipeCollectionModel({
		title,
		desc,
		image,
		author: userID,
	}).save();
}

export async function deleteRecipeCollection(
	id: MongoID
): Promise<DeleteResponse> {
	await RecipeCollectionModel.deleteOne({ _id: id });
	await User.updateOne(
		{ $where: "this.recipeCollections.length > 0" },
		{
			$pull: { recipeCollections: id },
		}
	);
	return {
		success: true,
		error: null,
		deleted: 1,
	};
}

export async function getAllRecipeCollections() {
	return await RecipeCollectionModel.find().lean().exec();
}
