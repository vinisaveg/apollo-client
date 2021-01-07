import { gql } from "@apollo/client";

export const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $name: String!
    $description: String!
    $ingredients: [String!]!
  ) {
    createRecipe(
      data: {
        name: $name
        description: $description
        ingredients: $ingredients
      }
    ) {
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
  }
`;
