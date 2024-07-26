const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://deepgondaliya070:hM02UJhzwuIIRgpB@cluster0.n1bf5d6.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const fetched_data = mongoose.connection.db.collection('food_items');
    global.food_items = await fetched_data.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection('food_category');
    global.food_category = await foodCategory.find({}).toArray();
    
  } catch (err) {
    console.log("Database connection error:", err);
  }
};

module.exports = mongoDB;

