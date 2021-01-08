import { FunctionComponent } from "react";

import { useQuery, useMutation } from "@apollo/client";

import { RecipesData } from "../types/RecipesData";
import { Recipe } from "../types/Recipe";

import { RECIPES } from "../graphql/queries/Recipes";
import { DELETE_RECIPE } from "../graphql/mutations/DeleteRecipe";
import { UPDATE_RECIPE } from "../graphql/mutations/UpdateRecipe";

const RecipesList: FunctionComponent = () => {
  const { loading, error, data } = useQuery(RECIPES);

  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  const handleDelete = async (id: string) => {
    deleteRecipe({
      variables: {
        id,
      },
      update: (cache, { data }) => {
        const recipesData = cache.readQuery<RecipesData>({
          query: RECIPES,
        });

        if (recipesData?.recipes !== undefined) {
          let filteredRecipesData = recipesData.recipes.filter(
            (recipe: Recipe) => {
              return recipe.id !== id;
            }
          );

          cache.writeQuery({
            query: RECIPES,
            data: {
              recipes: filteredRecipesData,
            },
          });
        }
      },
    });
  };

  const handleUpdate = (id: string) => {
    updateRecipe({
      variables: {
        id,
      },
    });
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

          <span
            onClick={() => handleUpdate(recipe.id)}
            style={{
              fontWeight: 600,
              color: "blue",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          >
            Atualizar
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
