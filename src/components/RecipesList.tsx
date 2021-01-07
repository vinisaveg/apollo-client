import { FunctionComponent } from "react";

import { useQuery, useMutation } from "@apollo/client";

import { RECIPES } from "../graphql/queries/Recipes";
import { DELETE_RECIPE } from "../graphql/mutations/DeleteRecipe";
import { RecipesData } from "../types/RecipesData";
import { Recipe } from "../types/Recipe";

const RecipesList: FunctionComponent = () => {
  const { loading, error, data } = useQuery(RECIPES);

  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  const handleDelete = async (id: string) => {
    // deleteRecipe({
    //   variables: {
    //     id,
    //   },
    //   update: (cache, { data }) => {
    //     const recipesData = cache.readQuery<RecipesData>({
    //       query: RECIPES,
    //     });
    //     if (recipesData?.recipes) {
    //       let deletedRecipeIndex = recipesData?.recipes.findIndex(
    //         (recipe: Recipe) => recipe.id === id
    //       );
    //       let updatedRecipesData = recipesData?.recipes.splice(
    //         deletedRecipeIndex,
    //         1
    //       );
    //       cache.writeQuery({
    //         query: RECIPES,
    //         data: {
    //           recipes: updatedRecipesData,
    //         },
    //       });
    //     }
    //   },
    // });
  };

  if (loading) return <span>Buscando...</span>;

  if (error) return <span>{error.message}</span>;

  return (
    <ul>
      {data?.recipes.map((recipe: any) => (
        <li key={recipe.id}>
          <span>{recipe.name}</span>

          <span
            onClick={() => handleDelete(recipe.id)}
            style={{
              fontWeight: 600,
              color: "red",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            Deletar
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
