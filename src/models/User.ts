import mongoose, { Model, Schema, Types } from "mongoose";

export enum OauthProvider {
	github = "github",
	google = "google",
	linkedin = "linkedin",
}

export interface IUser {
	_id: Types.ObjectId;
	username: string;
	oauthID: string;
	oauthProvider: OauthProvider;
	email?: string;
	profile: {
		name: string;
		bio?: string;
		avatar?: string;
		location?: string;
	};
	recipes: Types.ObjectId[];
	bookmarkedRecipes: Types.ObjectId[];
	recipeCollections: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	oauthID: { type: String, required: true },
	oauthProvider: {
		type: String,
		enum: Object.values(OauthProvider),
		required: true,
	},
	email: String,
	profile: {
		name: { type: String, required: true },
		bio: String,
		avatar: String,
		location: String,
	},
	recipes: {
		type: [{ type: Schema.Types.ObjectId, ref: "RecipeCard" }],
		default: [],
	},
	bookmarkedRecipes: {
		type: [{ type: Schema.Types.ObjectId, ref: "RecipeCard" }],
		default: [],
	},
	recipeCollections: {
		type: [{ type: Schema.Types.ObjectId, ref: "RecipeCollection" }],
		default: [],
	},
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default UserModel;
