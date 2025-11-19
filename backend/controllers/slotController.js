import Slot from "../models/slotModel.js";

// Get slots for a date
export const getSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date query is required" });
  }

  try {
    const slotsFromDb = await Slot.find({ date }).lean();

    const generateDefaultSlots = (startHour = 9, endHour = 23) => {
  const times = [];

  const formatHour = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:00 ${period}`;
  };

  for (let hour = startHour; hour <= endHour; hour++) {
    const nextHour = hour + 1;
    times.push({
      time: `${formatHour(hour)} - ${formatHour(nextHour)}`,
      status: "available",
    });
  }

  return times;
};


    const defaultSlots = generateDefaultSlots();

    const slots = defaultSlots.map((slot) => {
      const found = slotsFromDb.find((s) => s.time === slot.time);
      return found
        ? { time: slot.time, status: found.status } 
        : slot; // default available
    });

    res.json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ message: "Error fetching slots", error: error.message });
  }
};

// Save slots
export const saveSlots = async (req, res) => {
  const { date, times, status } = req.body;

  try {
    if (!date || !times || times.length === 0) {
      return res.status(400).json({ message: "Date and times are required" });
    }

    for (let time of times) {
      await Slot.findOneAndUpdate(
        { date, time },
        { date, time, status },
        { upsert: true, new: true }
      );
    }

    res.json({ message: `Slots marked as ${status} successfully!` });
  } catch (error) {
    console.error("Error saving slots:", error);
    res.status(500).json({ message: "Error saving slots", error: error.message });
  }
};
