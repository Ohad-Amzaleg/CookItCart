import { BASE_URL } from "../constants";
import FoodItem  from "./FoodItem";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { id } from "date-fns/locale";

export default class Recipes {
  userId: number;
  recipies: Array<FoodItem>;

  constructor(userId = 0, recipies = []) {
    this.userId = userId;
    this.recipies = recipies;
  }

  //@desc fetch recipes from database
  //@return type Promise<Array<FoodItem>>
  //@access private
  async fetchData(filterOptions: any): Promise<Recipes> {
    const { cookingTime, Rating, Ingredients, searchTerm } = filterOptions;
    const url = createUrl(cookingTime, Rating, Ingredients, searchTerm);
    try {
      const res = await axios.get(url, { withCredentials: true });
      const proccecedData = res.data.recepies.map((recipe: any) => {
        return new FoodItem(
          uuidv4(),
          recipe.name,
          recipe.image,
          recipe.servings,
          recipe.description,
          recipe.ingredients,
          recipe.instructions,
          recipe.video,
          recipe.category,
          recipe.rating,
          recipe.nutrition,
          recipe.timeToCook
        );
      });
      const filteredData = filterData(proccecedData, Rating, Ingredients);
      return new Recipes(this.userId, filteredData);
    } catch (err: any) {
      console.log(err);
      console.log("Error fetching recipes");
      return new Recipes(this.userId, []);
    }
  }

  //TODO: add fetchRecipe, fetchIngredients, fetchRatings
  // async fetchRecipe(recipeId) {
  // 	const res = await axios.get(`${BASE_URL}/api/recipes/${recipeId}`, { withCredentials: true });
  // 	return res.data;
  // }

  // async fetchIngredients() {
  // 	const res = await axios.get(`${BASE_URL}/api/ingredients`, { withCredentials: true });
  // 	return res.data;
  // }

  // async fetchRatings() {
  // 	const res = await axios.get(`${BASE_URL}/api/ratings`, { withCredentials: true });
  // 	return res.data;
  // }
}
const filterData = (unfilteredData: any, rating: any, ingredients: any) => {
  if (rating || ingredients) {
    const filterdData = unfilteredData.filter((recipe: any) => {
      let ratingMatch = true;
      let ingredientsMatch = true;

      if (ingredients) {
        // Extract ingredients and rating from the recipe
        const recipeIngredients = recipe.ingredients.map(
          (item: any) => item.raw_text
        );

        // Check if any of the ingredients match the provided ingredients
        const ingredientRegex = new RegExp(ingredients.join("|"), "i"); // Case-insensitive
        ingredientsMatch = recipeIngredients.some((ingredient: any) => {
          if (ingredientRegex.test(ingredient)) {
          }
          return ingredientRegex.test(ingredient);
        });
      }

      if (rating) {
        const recipeRating = recipe.rating.score * 5;
        // Check if the rating meets the specified rating
        ratingMatch = !rating || recipeRating >= rating;
      }
      // Return true if both ingredient and rating criteria are met
      return ingredientsMatch && ratingMatch;
    });
    return filterdData;
  }
  return unfilteredData;
};

const createUrl = (
  cookingTime: any,
  rating: any,
  ingredients: any,
  searchTerm: any
) => {
  const params: string[] = [];

  if (cookingTime) {
    params.push(`cookingTime=${cookingTime}`);
  }

  // if (rating) {
  // 	params.push(`rating=${rating}`)
  // }

  // if (ingredients) {
  // 	params.push(`ingredients=${ingredients.join(",")}}`)

  // }

  if (searchTerm) {
    params.push(`search=${searchTerm}`);
  }

  let url = `${BASE_URL}/api/recipes${params ? `?${params.join("&")}` : ``}`;
  return url;
};
