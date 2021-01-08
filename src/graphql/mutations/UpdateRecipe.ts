import { gql } from "@apollo/client";

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: String!) {
    updateRecipe(
      data: {
        name: "atualizado"
        description: "atualizado"
        ingredients: ["atua", "lizado"]
      }
      id: $id
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
