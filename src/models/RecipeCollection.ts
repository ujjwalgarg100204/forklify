import mongoose, { Model, Schema, Types } from "mongoose";

export interface IRecipeCollection {
	_id: Types.ObjectId;
	title: string;
	desc?: string;
	author: Types.ObjectId;
	image: string;
	recipes: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const recipeCollectionSchema = new mongoose.Schema<IRecipeCollection>({
	title: { type: String, required: true },
	desc: String,
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	image: { type: String, required: true },
	recipes: {
		type: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
		default: [],
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const RecipeCollectionModel: Model<IRecipeCollection> =
	mongoose.model<IRecipeCollection>(
		"RecipeCollection",
		recipeCollectionSchema
	);


export default RecipeCollectionModel;
