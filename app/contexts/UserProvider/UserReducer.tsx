import {
    Bookmark,
    Comment,
    Recipe,
    RecipeCollection,
    User,
} from "@prisma/client";

export const initialState = {
    user: null,
    comments: [],
    bookmarks: [],
    recipes: [],
    recipesCollections: [],
} satisfies UserState;

export type UserState = {
    user: User | null;
    comments: Comment[];
    bookmarks: Bookmark[];
    recipes: Recipe[];
    recipesCollections: RecipeCollection[];
};

export type Action =
    | {
          type: "SET_INITIAL_STATE";
          payload: {
              user: User;
              bookmarks: Bookmark[];
              recipes: Recipe[];
              recipesCollections: RecipeCollection[];
          };
      }
    | { type: "CLEAR_DATA" }
    | {
          type: "UPDATE_USER";
          payload: {
              user: Partial<Pick<User, "bio" | "image" | "location">>;
          };
      }
    | { type: "ADD_COMMENT"; payload: { comment: Comment } }
    | { type: "ADD_BOOKMARK"; payload: { bookmark: Bookmark } }
    | { type: "DELETE_BOOKMARK"; payload: Pick<Bookmark, "id"> }
    | {
          type: "ADD_RECIPE";
          payload: {
              recipe: Recipe;
          };
      }
    | {
          type: "UPDATE_RECIPE";
          payload: {
              recipe: Partial<
                  Omit<
                      Recipe,
                      | "id"
                      | "createdAt"
                      | "updatedAt"
                      | "userID"
                      | "recipeCollectionIDs"
                  >
              >;
              recipeId: string;
          };
      }
    | { type: "DELETE_RECIPE"; payload: { id: string } }
    | {
          type: "ADD_RECIPE_TO_COLLECTION";
          payload: { recipeId: string; collectionId: string };
      }
    | {
          type: "DELETE_RECIPE_FROM_COLLECTION";
          payload: { recipeId: string; collectionId: string };
      }
    | {
          type: "ADD_RECIPE_COLLECTION";
          payload: { recipeCollection: RecipeCollection };
      }
    | {
          type: "UPDATE_RECIPE_COLLECTION";
          payload: {
              recipeCollection: Partial<
                  Omit<
                      RecipeCollection,
                      "id" | "createdAt" | "updatedAt" | "userID"
                  >
              >;
              recipeCollectionId: string;
          };
      }
    | {
          type: "DELETE_RECIPE_COLLECTION";
          payload: { recipeCollectionId: string };
      };

const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case "SET_INITIAL_STATE":
            const { bookmarks, recipes, recipesCollections, user } =
                action.payload;
            return {
                ...state,
                bookmarks,
                recipes,
                recipesCollections,
                user,
            };
        case "CLEAR_DATA":
            return {
                bookmarks: [],
                recipes: [],
                recipesCollections: [],
                comments: [],
                user: null,
            };
        case "UPDATE_USER":
            const { user: updatedUser } = action.payload;
            return {
                ...state,
                user: state.user ? { ...state.user, ...updatedUser } : null,
            };
        case "ADD_COMMENT":
            const { comment } = action.payload;
            return {
                ...state,
                comments: [...state.comments, comment],
            };
        case "ADD_BOOKMARK":
            const { bookmark } = action.payload;
            return {
                ...state,
                bookmarks: [...state.bookmarks, bookmark],
            };
        case "DELETE_BOOKMARK":
            const { id } = action.payload;
            return {
                ...state,
                bookmarks: state.bookmarks.filter(
                    bookmark => bookmark.id !== id,
                ),
            };
        case "ADD_RECIPE":
            const { recipe } = action.payload;
            return {
                ...state,
                recipes: [...state.recipes, recipe],
            };
        case "UPDATE_RECIPE":
            const { recipe: updatedRecipe, recipeId } = action.payload;
            return {
                ...state,
                recipes: state.recipes.map(recipe => {
                    if (recipe.id === recipeId) {
                        return {
                            ...recipe,
                            ...updatedRecipe,
                        };
                    }
                    return recipe;
                }),
            };
        case "DELETE_RECIPE":
            const { id: recipeID } = action.payload;
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== recipeID),
            };
        case "ADD_RECIPE_TO_COLLECTION":
            const { recipeId: recipe_id, collectionId } = action.payload;
            return {
                ...state,
                recipesCollections: state.recipesCollections.map(collection => {
                    if (collection.id === collectionId) {
                        return {
                            ...collection,
                            recipeIDs: [...collection.recipeIDs, recipe_id],
                        };
                    }
                    return collection;
                }),
            };

        case "DELETE_RECIPE_FROM_COLLECTION":
            const { recipeId: recipe_Id, collectionId: collectionID } =
                action.payload;
            return {
                ...state,
                recipesCollections: state.recipesCollections.map(collection => {
                    if (collection.id === collectionID) {
                        return {
                            ...collection,
                            recipeIDs: collection.recipeIDs.filter(
                                recipeID => recipeID !== recipe_Id,
                            ),
                        };
                    }
                    return collection;
                }),
            };

        case "ADD_RECIPE_COLLECTION":
            const { recipeCollection } = action.payload;
            return {
                ...state,
                recipesCollections: [
                    ...state.recipesCollections,
                    recipeCollection,
                ],
            };
        case "UPDATE_RECIPE_COLLECTION":
            const {
                recipeCollection: updatedRecipeCollection,
                recipeCollectionId,
            } = action.payload;
            return {
                ...state,
                recipesCollections: state.recipesCollections.map(
                    recipeCollection => {
                        if (recipeCollection.id === recipeCollectionId) {
                            return {
                                ...recipeCollection,
                                ...updatedRecipeCollection,
                            };
                        }
                        return recipeCollection;
                    },
                ),
            };

        case "DELETE_RECIPE_COLLECTION":
            const { recipeCollectionId: recipeCollectionID } = action.payload;
            return {
                ...state,
                recipesCollections: state.recipesCollections.filter(
                    recipeCollection =>
                        recipeCollection.id !== recipeCollectionID,
                ),
            };
        default:
            throw new Error("Invalid action type");
    }
};

export default userReducer;
