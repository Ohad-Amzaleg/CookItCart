import { co } from "@fullcalendar/core/internal-common";
import { BASE_URL } from "../constants";
import FoodItem  from "./FoodItem";
import axios from "axios";



export default class  Cart {
  userId: number;
  items: Array<FoodItem>;

  constructor() {
    this.userId = 0;
    this.items = [];
  }
  


  //@desc fetch cart from database
  //@access private
  async fetchCart(id: number) {
    const res = await axios.get(`${BASE_URL}/api/cart/${id}`, {
      withCredentials: true,
    });
    this.userId = res.data.id;
    this.items = res.data.items;
  }

  //@desc add item to cart
  //@access private
  async addToCart(foodItem: FoodItem) {

    const ingredientsList = foodItem.ingredients.map((item) => item.raw_text).filter(item => item !== 'n/a');
    const nessaryIngredients: Array<string> = foodItem.ingredients.map((item) => item.raw_text)
  .filter(item => item !== 'n/a' && !item.includes('Salt and pepper to taste')) // Exclude 'n/a' and unwanted phrases
      .map(item => item.replace(/\d+ (oz|Tbsp\.|lbs|cup|Tbsp|tsp) /, '').trim()); // Remove quantity measurement
    
    
    const ingredientsToGrams: Record<string, number> = {};

    ingredientsList.forEach((item: string) => {
      const parts = item.split(' ').slice(1).join(' '); // Remove quantity from ingredient
      ingredientsToGrams[parts] = parseFloat(convertToGrams(item)); // Convert the value to a number
    });

    this.items.push(foodItem);
  }

  //@desc remove item from cart
  //@access private
  async removeFromCart(recipeId: string) {
    console.log("remove from cart");
    console.log(recipeId);
    this.items = this.items.filter((item) => item.id !== recipeId);
  }

  //@desc update database with current cart
  //@aceess private
  async updateDB() {
    const res = await axios.put(
      `${BASE_URL}/api/cart/${this.userId}`,
      { items: this.items },
      { withCredentials: true }
    );
    return res.data;
  }

  //@desc fetch orders from database
  //@access private
  async fetchOrders() {
    const res = await axios.get(`${BASE_URL}/api/orders/${this.userId}`, {
      withCredentials: true,
    });
    return res.data;
  }

  //@desc checkout cart
  //@access private
  async checkout() {
    const res = await axios.post(`${BASE_URL}/api/orders/${this.userId}`, {
      withCredentials: true,
    });
    return res.data;
  }
}

//Calculate the grams of each ingredient
const ingredientGramsTable: Record<string, number>  = {
  'oz': 28.35, // 1 ounce ≈ 28.35 grams 
  'Tbsp.': 15, // 1 tablespoon ≈ 15 grams
  'tsp': 5,    // 1 teaspoon ≈ 5 grams
  'lbs': 453.59, // 1 pound ≈ 453.59 grams
  'cup': 240, // 1 cup ≈ 240 grams
};


function convertToGrams(ingredient: string) {
  const amountRegex = /(\d+(\.\d+)?)\s*(oz|Tbsp\.|tsp|lbs|cup)/;
  const match = ingredient.match(amountRegex);

  if (match) {
    const quantity = parseFloat(match[1]);
    const unit = match[3];
    const grams = quantity * ingredientGramsTable[unit] ;
    return grams.toFixed(2) + ' grams';
  } else {
    return '0';
  }
}