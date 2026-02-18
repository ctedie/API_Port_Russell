const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

// GET /catways/:id/reservations
exports.list = async (req, res) => {
  const catwayNumber = Number(req.params.id);

  const reservations = await Reservation.find({ catwayNumber })
    .sort({ startDate: 1 });

  res.json(reservations);
};

// GET /catways/:id/reservations/:idReservation
exports.getOne = async (req, res) => {
  const catwayNumber = Number(req.params.id);

  const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber,
  });

  if (!reservation)
    return res.status(404).json({ message: "Reservation not found" });

  res.json(reservation);
};

// POST /catways/:id/reservations
exports.create = async (req, res) => {
  const catwayNumber = Number(req.params.id);

  const catwayExists = await Catway.findOne({ catwayNumber });
  if (!catwayExists)
    return res.status(404).json({ message: "Catway not found" });

  const reservation = await Reservation.create({
    catwayNumber,
    ...req.body,
  });

  res.status(201).json(reservation);
};

// PUT /catways/:id/reservations/:idReservation
exports.update = async (req, res) => {
  const catwayNumber = Number(req.params.id);

  const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber,
  });

  if (!reservation)
    return res.status(404).json({ message: "Reservation not found" });

  Object.assign(reservation, req.body);

  await reservation.save();

  res.json(reservation);
};

// DELETE /catways/:id/reservations/:idReservation
exports.remove = async (req, res) => {
  const catwayNumber = Number(req.params.id);

  const result = await Reservation.deleteOne({
    _id: req.params.idReservation,
    catwayNumber,
  });

  if (result.deletedCount === 0)
    return res.status(404).json({ message: "Reservation not found" });

  res.status(204).send();
};
