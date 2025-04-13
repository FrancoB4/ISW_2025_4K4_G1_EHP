import React from "react"
export const TimeSelection = ({
  selectedActivity,
  selectedTime,
  onSelectTime
}) => {
  const availableTimes = [
    {
      id: "morning",
      time: "09:00 AM",
      available: true,
      spots: 8,
      maxSpots: 15
    },
    {
      id: "noon",
      time: "12:00 PM",
      available: true,
      spots: 4,
      maxSpots: 15
    },
    {
      id: "afternoon",
      time: "03:00 PM",
      available: true,
      spots: 12,
      maxSpots: 15
    },
    {
      id: "evening",
      time: "06:00 PM",
      available: selectedActivity !== "jardineria",
      spots: 15,
      maxSpots: 15
    }
  ]
  return (
    <div className="mt-8">
      <h3 className="text-gray-700 mb-3">Selecciona un horario:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availableTimes.map(slot => (
          <button
            key={slot.id}
            className={`py-3 text-center border rounded-md ${
              selectedTime === slot.id
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300"
            } ${
              !slot.available || slot.spots === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-green-600"
            }`}
            onClick={() =>
              slot.available && slot.spots > 0 && onSelectTime(slot.id)
            }
            disabled={!slot.available || slot.spots === 0}
          >
            <div>{slot.time}</div>
            <div
              className={`text-xs mt-1 ${
                selectedTime === slot.id ? "text-white" : "text-gray-500"
              }`}
            >
              {slot.spots} cupos disponibles
            </div>
            {(!slot.available || slot.spots === 0) && (
              <div className="text-xs text-red-500">No disponible</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
