{/* Componente que se encarga de los horarios y cupos disponibles */}

import React, { useMemo } from "react"
export const TimeSelection = ({
  selectedDate,
  selectedActivity,
  selectedTime,
  requiredSpots,
  onSelectTime
}) => {
  // Mapa de capacidad máxima por actividad
  const activityCapacity = {
    tirolesa: 15,
    safari: 20,
    palestra: 10,
    jardineria: 25
  }

  // Generar slots de tiempo con disponibilidad fija basada en la actividad
  const timeSlots = useMemo(() => {
    const maxCapacity = activityCapacity[selectedActivity]
    const slots = []
    for (let hour = 9; hour <= 18; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`
      // Aseguramos que la disponibilidad sea consistente y basada en la capacidad de la actividad
      const available = Math.max(
        maxCapacity - Math.floor(Math.random() * 5),
        requiredSpots
      ) // Restamos un número aleatorio entre 0-4 para variar un poco
      slots.push({
        time,
        available: Math.min(available, maxCapacity),
        capacity: maxCapacity
      })
    }
    return slots
  }, [selectedActivity, requiredSpots]) // Solo recalcular si cambia la actividad o el número de participantes
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
            key={slot.time}
            className={`py-3 text-center border rounded-md ${
              selectedTime === slot.time
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300"
            } ${
              slot.available < requiredSpots
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-green-600"
            }`}
            onClick={() =>
              slot.available >= requiredSpots && onSelectTime(slot.time)
            }
            disabled={slot.available < requiredSpots}
          >
            <div className="font-medium">{slot.time}</div>
            <div
              className={`text-xs mt-1 ${
                selectedTime === slot.time ? "text-white" : "text-gray-500"
              }`}
            >
              {slot.available} de {slot.capacity} cupos
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
