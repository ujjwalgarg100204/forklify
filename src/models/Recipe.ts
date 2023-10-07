import mongoose, { Model, Schema, Types } from "mongoose";

export enum RecipeCategories {
	breakfast = "breakfast",
	brunch = "brunch",
	snack = "snack",
	appetizer = "appetizers",
	lunch = "lunch",
	drink = "drinks",
	dessert = "dessert",
	dinner = "dinner",
}

export enum Regions {
	japanese = "japanese",
	chinese = "chinese",
	vietnamese = "vietnamese",
	russian = "russian",
	korean = "korean",
	indian = "indian",
	indonesian = "indonesian",
	pakistan = "pakistan",
	turkish = "turkish",
}

export interface IRecipe {
	_id: Types.ObjectId;
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
	region: Regions;
	servings: number;
	prepTime: number;
	cookTime: number;
	notes?: string;
	nutrition?: {
		calories?: number;
		protein?: number;
		carb?: number;
		fat?: number;
	};
	bookmarkCount: number;
	reviews: {
		user: Types.ObjectId;
		review: String;
		createdAt: Date;
		rating: number;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const recipeSchema: Schema = new Schema<IRecipe>({
	title: { type: String, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	desc: { type: String, required: true },
	ingredients: {
		type: [
			{
				name: { type: String, required: true },
				quantity: {
					num: { type: Number, required: true },
					suffix: { type: String, required: true },
				},
			},
		],
		default: [],
	},
	category: {
		type: String,
		required: true,
		enum: Object.values(RecipeCategories),
	},
	steps: { type: [String], required: true },
	tags: { type: [String], required: true },
	image: { type: String, required: true },
	region: { type: String, required: true, enum: Object.values(Regions) },
	nutrition: {
		calories: Number,
		protein: Number,
		carb: Number,
		fat: Number,
	},
	servings: { type: Number, required: true },
	prepTime: { type: Number, required: true, min: 1 },
	cookTime: { type: Number, required: true, min: 1 },
	notes: String,
	bookmarkCount: { type: Number, default: 0 },
	reviews: {
		type: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				review: { type: String, required: true },
				createdAt: { type: Date, default: Date.now },
				rating: { type: Number, required: true },
			},
		],
		default: [],
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const RecipeModel: Model<IRecipe> = mongoose.model<IRecipe>(
	"Recipe",
	recipeSchema
);

export default RecipeModel;
