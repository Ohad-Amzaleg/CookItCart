const axios = require("axios");
const RecipesClass = require("../Class/RecipesClass");
const fs = require("fs");

const TIMEOPTIONS = {
  45: "under_45_minutes",
  30: "under_30_minutes",
  15: "under_15_minutes",
};
const options = (tags, query) => {
  console.log(query);
  return {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: {
      from: "0",
      size: "40",
      tags: `${TIMEOPTIONS[tags]}`,
      q: `${query}`,
    },
    headers: {
      "X-RapidAPI-Key": "7a347599a1mshe57f6e84aec1e8dp1e5097jsn20d202317680",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };
};

const toRecepie = (data) => {
  const recepies_arr = data.map((recepie) => {
    const {
      name,
      description,
      thumbnail_url,
      sections,
      original_video_url,
      num_servings,
      user_ratings,
      nutrition,
      total_time_tier,
      instructions,
    } = recepie;

    return new RecipesClass(
      name,
      thumbnail_url,
      num_servings,
      description,
      sections[0] ? sections[0].components : "",
      instructions,
      original_video_url,
      sections[0] ? sections[0].name : "",
      user_ratings,
      nutrition,
      total_time_tier ? total_time_tier.display_tier : ""
    );
  });
  return recepies_arr;
};

const getRecpies = async (keyword='Pasta') => {
  console.log(keyword);
  const re = new RegExp(`${keyword}`, "i");
  const data = fs.readFileSync("/Users/ohad/MyProjects/CookItCart/BackEnd/Util/recepies.json");
  const parsedData = JSON.parse(data);

  const filteredRecipes = parsedData.filter((recipe) => {
        return recipe.name.match(re, "i");
      });

  return filteredRecipes;
};

function createRecepiesJson() {
  const commonIngredients = [
    // Fruits
    'Apple',
    'Banana',
    'Orange',
    'Strawberry',
    'Blueberry',
    'Mango',
    'Grapes',
    'Pineapple',
    'Watermelon',
    'Lemon',
    'Lime',
  
    // Vegetables
    'Broccoli',
    'Carrot',
    'Tomato',
    'Spinach',
    'Cucumber',
    'Bell Pepper',
    'Lettuce',
    'Onion',
    'Garlic',
    'Potato',
    'Zucchini',
  
    // Other Ingredients
    'Flour',
    'Honey',
    'Soy Sauce',
    'Vinegar',
    'Balsamic Vinegar',
  ];
 processKeywords(commonIngredients); 
}

function removeDuplicatesByProperty() {
  const uniqueArray = [];
  const seen = new Set();
  const array = fs.readFileSync("/Users/ohad/MyProjects/CookItCart/BackEnd/Util/recepies.json");
  const flattedArray = JSON.parse(array).flat();

  for (const item of flattedArray) {
    const propertyValue = item.name;
    if (!seen.has(propertyValue)) {
      seen.add(propertyValue);
      uniqueArray.push(item);
    }
  }
  console.log(flattedArray.length);
  console.log(uniqueArray.length);
  fs.writeFileSync("./recepies.json", JSON.stringify(uniqueArray));
  console.log("Done");
}

async function processKeywords(keyWords) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let counter = 0;

  for (const keyWord of keyWords) {
    counter++;
    // Request limit is 5 per second
    if (counter % 5 === 0) {
      console.log("Waiting 1 seconds");
      await delay(1000); // Introduce a 2-second delay
    }

    const option = options(30, keyWord);

    try {
      const res = await axios.request(option);
      const data = res.data.results;
      const recipes_arr = toRecepie(data);
      const recipes_json = JSON.stringify(recipes_arr.flat());
      fs.appendFileSync("recepies.json", recipes_json);
    } catch (err) {
      console.log(err);
    }
  }
}


const fetchTastyFood = async (tags = 30, query = "") => {
  try {
    const response = await axios.request(options(tags, query));
    const data = response.data.results;

    const recepies_arr = toRecepie(data);

    return recepies_arr;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchTastyFood,getRecpies };
