// src/pages/Booking.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Booking() {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Generate default slots with AM/PM format
  const generateDefaultSlots = () => {
    const times = [];

    const formatHour = (hour) => {
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      return `${hour12}:00 ${period}`;
    };

    for (let hour = 9; hour <= 23; hour++) {
      const nextHour = hour + 1;
      times.push({
        time: `${formatHour(hour)} - ${formatHour(nextHour)}`,
        status: "available",
      });
    }

    return times;
  };

  // Fetch slots from backend whenever date changes
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const formattedDate = date.toISOString().split("T")[0];
        const res = await axios.get(
          `http://localhost:5000/api/slots?date=${formattedDate}`
        );
        const slotsFromDb = res.data;

        const defaultSlots = generateDefaultSlots().map((slot) => {
          const found = slotsFromDb.find((s) => s.time === slot.time);
          return found ? { ...slot, status: found.status } : slot;
        });

        setSlots(defaultSlots);
        setSelectedSlots([]);
      } catch (err) {
        console.error("Error fetching slots", err);
        setSlots(generateDefaultSlots());
      }
    };

    fetchSlots();
  }, [date]);

  // Toggle slot selection
  const toggleSlot = (slot) => {
    if (slot.status !== "available") return; // Only allow selecting available slots

    setSelectedSlots((prev) =>
      prev.includes(slot.time)
        ? prev.filter((t) => t !== slot.time)
        : [...prev, slot.time]
    );
  };

  // WhatsApp booking
  const handleWhatsAppBooking = () => {
    if (selectedSlots.length === 0) {
      alert("Please select at least one slot to proceed.");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    const slotTimes = selectedSlots.join(", ");
    const totalHours = selectedSlots.length;

    const message = `Hello, I want to book the following slots on ${formattedDate}: ${slotTimes}. Total Hours: ${totalHours}`;
    const whatsappNumber = "923555562100"; // whats app no. change in future
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="pt-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Book Your Slot</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <Calendar onChange={setDate} value={date} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => toggleSlot(slot)}
              className={`cursor-pointer p-3 rounded-lg text-center shadow-md ${
                selectedSlots.includes(slot.time)
                  ? "bg-yellow-500 text-white"
                  : slot.status === "available"
                  ? "bg-green-200"
                  : "bg-red-400 text-white cursor-not-allowed"
              }`}
            >
              {slot.time}
            </div>
          ))}
        </div>
      </div>

      {selectedSlots.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Selected Slots:</h3>
          <ul className="w-[130px] h-auto flex flex-col justify-center p-[6px] font-bold text-black rounded-3xl border-none">
            {selectedSlots.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          {/* Show total hours */}
          <p className="mt-2 font-semibold">
            Total Hours: {selectedSlots.length}
          </p>

          <button
            onClick={handleWhatsAppBooking}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Book your Slot
          </button>
        </div>
      )}
    </div>
  );
}
