{/* Componente que se encarga de los horarios y cupos disponibles */}

export const TimeSelection = ({
  activities,
  selectedDate,
  selectedActivity,
  selectedTime,
  requiredSpots,
  onSelectTime
}) => {

  let timeSlots;
  let capacity;
  activities.forEach(act => {
    if (act.id === selectedActivity) {
      timeSlots = act.schedules;
      capacity = act.capacity;
    }
  });

  return (
    <div className="mt-8">
      <h3 className="text-gray-700 mb-3">
        Selecciona un horario para el{" "}
        {selectedDate.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
        :
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeSlots.map(slot => (
          <button
            key={slot.id}
            className={`py-3 text-center border rounded-md ${
              selectedTime === slot.id
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300"
            } ${
              slot.isAvailable
                ? "hover:border-green-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              slot.isAvailable && onSelectTime(slot.id)
            }
            disabled={!slot.isAvailable}
          >
            <div className="font-medium">{slot.time}</div>
            <div
              className={`text-xs mt-1 ${
                selectedTime === slot.id ? "text-white" : "text-gray-500"
              }`}
            >
              {capacity - slot.placesLeft} de {capacity} cupos
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
