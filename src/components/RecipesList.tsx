import { FunctionComponent } from "react";

import { useQuery } from "@apollo/client";

import { RECIPES } from "../graphql/queries/Recipes";

const RecipesList: FunctionComponent = () => {
  const { loading, error, data } = useQuery(RECIPES);

  const handleDelete = async (id: string) => {};

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
