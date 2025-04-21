{/* Componente que se encarga de los horarios y cupos disponibles */}

export const TimeSelection = ({
  activities,
  selectedDate,
  selectedActivity,
  selectedTime,
  selectedDayTime,
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
      <h3 className="text-primary-dark font-semibold mb-3">
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
                ? "bg-primary-sea text-white border-primary-sea"
                : "bg-white text-gray-700 border-gray-300"
            } ${
              slot.isAvailable
                ? "hover:border-primary-sea"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              slot.isAvailable && onSelectTime(slot.id, slot.time)
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
