import { Recipe } from "./Recipe";

export interface ResponseType {
  recipe: Recipe;

  error: { message: string };

  success: boolean;
}
