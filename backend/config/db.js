const mongoose = require("mongoose");

async function connectDb() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI manquant dans .env");
  }

  // Options recommandées (mongoose récent n’a plus besoin de useNewUrlParser/useUnifiedTopology)
  await mongoose.connect(uri);

  console.log("✅ MongoDB connecté");
}

module.exports = { connectDb };
