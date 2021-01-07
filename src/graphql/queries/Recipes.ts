import { gql } from "@apollo/client";

export const RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      name
      description
      ingredients
    }
  }
`;
