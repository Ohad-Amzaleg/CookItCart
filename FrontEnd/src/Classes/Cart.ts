import { BASE_URL } from "../constants";
import FoodItem from "./FoodItem";
import axios from "axios";
import Fraction from 'fraction.js';

export default class Cart {
  userId: number;
  items: Array<FoodItem>;
  itemTable: Map<number, Map<string, number>> = new Map();
  cartTable: Map<string, number> = new Map();

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
    //Create a list of ingredients with their grams
    const ingredientsToGrams = createIngrideintsTable(foodItem);
    //Add to the item table new item with the ingredients table
    this.itemTable.set(parseFloat(foodItem.id), ingredientsToGrams);
    //Update the global cart table ingredients
    ingredientsToGrams.forEach((value, key) => {
      if (this.cartTable.has(key)) {
        const currentVal = this.cartTable.get(key) ?? 0;
        this.cartTable.set(key, currentVal + value);
      } else {
        this.cartTable.set(key, value);
      }
    });

    //If the item is already in the cart, don't add it again
    if (this.items.some((item) => item.id === foodItem.id))
      return;
    this.items.push(foodItem);
  }

  //@desc remove item from cart
  //@access private
  async removeFromCart(recipeId: string) {

    this.items = this.items.filter((item) => item.id !== recipeId);
    //Remove the item ingredients from the cart table
    const ingredientsToGrams = this.itemTable.get(parseFloat(recipeId));
    ingredientsToGrams?.forEach((value, key) => {
      // console.log(`key : ${key} value : ${value}`);
      if (this.cartTable.has(key)) {
        const currentVal = this.cartTable.get(key) ?? 0;
        if (Number.isNaN(currentVal) || currentVal - value === 0) {
          this.cartTable.delete(key);
        } else this.cartTable.set(key, currentVal - value);
      }
    });
    // console.log(this.cartTable);
    //Remove the item from the item table
    this.itemTable.delete(parseFloat(recipeId));
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
const ingredientGramsTable: Record<string, number> = {
  oz: 28.35, // 1 ounce ≈ 28.35 grams
  tablespoons: 15, // 1 tablespoon ≈ 15 grams
  tablespoon: 15, // 1 tablespoon ≈ 15 grams
  ounce: 28.35, // 1 ounce ≈ 28.35 grams
  pound: 453.59, // 1 pound ≈ 453.59 grams
  teaspoons: 5, // 1 teaspoon ≈ 5 grams
  teaspoon: 5, // 1 teaspoon ≈ 5 grams
  tbsp: 15, // 1 tablespoon ≈ 15 grams
  tsp: 5, // 1 teaspoon ≈ 5 grams
  lbs: 453.59, // 1 pound ≈ 453.59 grams
  cup: 240, // 1 cup ≈ 240 grams
  cups: 240, // 1 cup ≈ 240 grams
  none: 1,
};

const unicodeFractionToFloat = (input: string): number => {
  const normalize = input.normalize("NFKD");
  const operands = normalize.split("⁄");
  if (operands.length === 2) {
    try {
      const fraction = new Fraction(parseInt(operands[0]), parseInt(operands[1]));
      console.log(fraction.valueOf());
      return fraction.valueOf(); // Convert the fraction to a float
    } catch (error) {
      console.log(error)  
    }
  }
  // If no Unicode fractions were found or converted, return the original input
  return parseFloat(input);
};


function createIngrideintsTable(foodItem: FoodItem) {
  console.log(foodItem.ingredients);
  // Create a list of ingredients with their grams
  const ingredientsToGrams: Map<string, number> = new Map();
  foodItem.ingredients.forEach((item: any) => {
    let name = item.ingredient.name;
    let index = 0;
    let quantity =
      item.measurements.some((m: any) => {
        if (m.unit.system === "none"
          || m.unit.system === "metric")
        {
          index = item.measurements.indexOf(m);
          return true;
        }
        return false;
        })
    ? parseFloat(item.measurements[index].quantity)
    : ingredientGramsTable[item.measurements[0].unit.name] *
    unicodeFractionToFloat(item.measurements[0].quantity);
    
    ingredientsToGrams.set(name, quantity);
  });

  return ingredientsToGrams;
}
