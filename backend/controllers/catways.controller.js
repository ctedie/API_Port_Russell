const Catway = require("../models/Catway");

// GET /catways
exports.list = async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  res.json(catways);
};

// GET /catways/:id
exports.getOne = async (req, res) => {
  const catway = await Catway.findOne({
    catwayNumber: req.params.id,
  });

  if (!catway)
    return res.status(404).json({ message: "Catway not found" });

  res.json(catway);
};

// POST /catways
exports.create = async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;

  const exists = await Catway.findOne({ catwayNumber });
  if (exists)
    return res.status(409).json({ message: "Catway already exists" });

  const catway = await Catway.create({
    catwayNumber,
    catwayType,
    catwayState,
  });

  res.status(201).json(catway);
};

// PUT /catways/:id
// ⚠️ seul catwayState modifiable
exports.update = async (req, res) => {
  const { catwayState } = req.body;

  const catway = await Catway.findOne({
    catwayNumber: req.params.id,
  });

  if (!catway)
    return res.status(404).json({ message: "Catway not found" });

  catway.catwayState = catwayState ?? catway.catwayState;

  await catway.save();

  res.json(catway);
};

// DELETE /catways/:id
exports.remove = async (req, res) => {
  const result = await Catway.deleteOne({
    catwayNumber: req.params.id,
  });

  if (result.deletedCount === 0)
    return res.status(404).json({ message: "Catway not found" });

  res.status(204).send();
};
