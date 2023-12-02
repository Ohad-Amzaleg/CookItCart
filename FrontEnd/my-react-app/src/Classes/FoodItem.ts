export default class FoodItem {
  id: string;
  name: string;
  image: string;
  servings: number;
  description: string;
  ingredients: Array<any>;
  instructions: Array<any>;
  video: string;
  category: string;
  rating: { score: number };
  nutrition: Array<any>;
  timeToCook: number;

  constructor(
    id: string,
    name: string,
    image: string,
    servings: number,
    description: string,
    ingredients: Array<any>,
    instructions: Array<any>,
    video: string,
    category: string,
    rating: { score: number },
    nutrition: Array<any>,
    timeToCook: number
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.servings = servings;
    this.description = description;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.video = video;
    this.category = category;
    this.rating = rating;
    this.nutrition = nutrition;
    this.timeToCook = timeToCook;
  }
}
