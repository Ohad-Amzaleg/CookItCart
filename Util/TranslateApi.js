const axios = require('axios');
const fs = require('fs');

const shoppingList = [
    { name: "Milk", amount: "2 gallons" },
    { name: "Bread", amount: "3 loaves" },
    { name: "Eggs", amount: "1 dozen" },
    { name: "Apples", amount: "5 pounds" },
    { name: "Chicken breasts", amount: "2 pounds" },
    { name: "Pasta", amount: "3 boxes" },
    { name: "Tomatoes", amount: "4" },
    { name: "Onions", amount: "2" },
    { name: "Rice", amount: "5 pounds" },
    { name: "Cereal", amount: "1 box" },
    { name: "Toilet paper", amount: "12 rolls" },
    { name: "Toothpaste", amount: "1 tube" },
    { name: "Shampoo", amount: "1 bottle" },
    { name: "Laundry detergent", amount: "1 bottle" },
    { name: "Dish soap", amount: "1 bottle" },
    { name: "Paper towels", amount: "2 rolls" },
    { name: "Ground beef", amount: "2 pounds" },
    { name: "Potatoes", amount: "5 pounds" },
    { name: "Butter", amount: "1 pound" },
    { name: "Orange juice", amount: "1 carton" }
  ];
  const stringShpingList= shoppingList.map((item)=>`${item.name}: ${item.amount}`).join(", ");
  
const options = {
  method: 'POST',
  url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
  params: {
    'to[0]': 'he',
    'api-version': '3.0',
    profanityAction: 'NoAction',
    textType: 'plain'
  },
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '7a347599a1mshe57f6e84aec1e8dp1e5097jsn20d202317680',
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
  },
  data: [
    {
      Text: stringShpingList
    }
  ]
};
const translate = async () => {
try {
	const response = await axios.request(options);
    const data= response.data[0].translations[0].text;
    const dataString =JSON.stringify(data);
    fs.writeFileSync('shoppingList.txt', dataString);
} catch (error) {
	console.error(error);
}
}
translate();