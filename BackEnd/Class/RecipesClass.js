
class RecipesClass {
    constructor(name, image, servings, description, ingredients, instructions, video, category, rating, nutrition, timeToCook) {
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
module.exports = RecipesClass ;