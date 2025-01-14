import mongoose from "mongoose";
import Recipe from "./models/Recipe.model.js";
import data from "./data.json" assert { type: "json" };

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Bombom de travessa",
      level: "Easy Peasy",
      ingredients: [
        "250 g de chocolate ao leite",
        "250 g de chocolate meio amargo",
        "2 latas de leite condensado",
        "2 latas de creme de leite",
        "2 colheres de margarina",
        "2 caixas de morango",
      ],
      cuisine: "brazilian",
      dishType: "dessert",
      duration: 35,
      creator: "Shania",
    };
    Recipe.create(newRecipe, () => console.log(newRecipe.title));
    Recipe.insertMany(data, () =>
      data.forEach((recipe) => console.log(recipe.title))
    );
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      () => console.log("update done sucessfully")
    );
    Recipe.deleteOne({ title: "Carrot Cake" }, () =>
      console.log("Data deleted sucessfully")
    );
    mongoose.connection.close(() => {
      console.log("Closed database");
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
