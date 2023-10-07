import { Router } from "express";
import {
	deleteRecipeCollection,
	getRecipeCollection,
	getRecipeCollectionOfUser,
	insertRecipeCollection,
	updateRecipeCollection,
} from "../../data/RecipesCollection";
import { IRecipeCollection } from "../../models/RecipeCollection";

const CollectionUserRouter = Router();

// Create User Collection
CollectionUserRouter.get("/create", (req, res) => {
	res.render("pages/user/collections/create-edit", {
		user: req.user,
		editable: false,
		collection: {},
	});
});

CollectionUserRouter.post("/create", async (req, res) => {
	const { title, desc, image } = req.body;
	await insertRecipeCollection(req.user!._id, title, desc, image);
	res.redirect("/u/collections"); // redirect to page where all collections are shown
});

// Update User Collection
CollectionUserRouter.get("/edit/:id", async (req, res) => {
	const { id } = req.params;
	const collectionData = (await getRecipeCollection(id)) as IRecipeCollection;
	console.log({ su: "s", ...collectionData });

	res.render("pages/user/collections/create-edit", {
		user: req.user,
		editable: true,
		collection: collectionData,
	});
});

CollectionUserRouter.post("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { title, desc, image } = req.body;

	await updateRecipeCollection(id, title, desc, image);

	res.redirect("/u/collections"); // redirect to page where all collections are shown
});

CollectionUserRouter.get("/delete/:id", async (req, res) => {
	const { id } = req.params;
	const { confirmation } = req.query;
	if (confirmation) {
		await deleteRecipeCollection(id);
		res.redirect("/u/collections");
		return;
	}

	const recipeCollectionDetail = await getRecipeCollection(id);
	res.render("components/confirm", {
		prompt: `You are about to delete *${recipeCollectionDetail?.title}* Collection`,
		yesMessage: "Are you sure to delete this collection?",
		yesLink: `/u/collections/delete/${id}?confirmation=true`,
	});
});

// Show all collections of user
CollectionUserRouter.get("/", async (req, res) => {
	const collections = await getRecipeCollectionOfUser(req.user!._id);
	res.render("pages/collections/index", {
		collections,
		user: req.user,
		personalised: true,
	});
});

export default CollectionUserRouter;
