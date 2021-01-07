import { FunctionComponent, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { CREATE_RECIPE } from "./graphql/mutations/CreateRecipe";

import "./App.css";

import RecipesList from "./components/RecipesList";

const App: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<Array<string>>([]);

  const [createRecipe, { loading }] = useMutation(CREATE_RECIPE, {
    update(cache, { data: { createRecipe } }) {
      cache.modify({
        fields: {
          recipes(existingrecipes = []) {
            const newRecipeRef = cache.writeFragment({
              data: createRecipe,
              fragment: gql`
                fragment Response on ResponseType {
                  recipe {
                    id
                    name
                    description
                    ingredients
                  }
                  error {
                    message
                  }
                  success
                }
              `,
            });

            return [...existingrecipes, newRecipeRef];
          },
        },
      });
    },
  });

  const handleIngredients = (value: string) => {
    let ingredientsArray = value.split(",");

    setIngredients(ingredientsArray);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createRecipe({
      variables: {
        name,
        description,
        ingredients,
      },
    });
  };

  return (
    <div className="app">
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="name">Nome</label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          id="name"
          type="text"
        />
        <label htmlFor="description">Descrição</label>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          id="description"
          type="text"
        />
        <label htmlFor="ingredients">Ingredientes</label>
        <input
          value={ingredients}
          onChange={(event) => handleIngredients(event.target.value)}
          id="ingredients"
          type="text"
        />

        <button>{loading ? "Salvando" : "Salvar"}</button>
      </form>

      <RecipesList />
    </div>
  );
};

export default App;
