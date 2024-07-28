const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://deepgondaliya070:hM02UJhzwuIIRgpB@cluster0.n1bf5d6.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Fetching food items
    const foodItemsCollection = mongoose.connection.db.collection('food_items');
    global.food_items = await foodItemsCollection.find({}).toArray();

    // Fetching food categories
    const foodCategoryCollection = mongoose.connection.db.collection('food_category');
    global.food_category = await foodCategoryCollection.find({}).toArray();

  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = mongoDB;
//vdojgreghiuhgfdj