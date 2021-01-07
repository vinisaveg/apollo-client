import { gql } from "@apollo/client";

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      error {
        message
      }
      success
    }
  }
`;
