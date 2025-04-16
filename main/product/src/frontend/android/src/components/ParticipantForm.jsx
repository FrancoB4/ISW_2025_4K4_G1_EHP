{/* Componente que se encarga del formulario de cada participante */}
import React from "react"
export const ParticipantForm = ({
  participants,
  activity,
  onUpdate,
  onNext,
  onBack
}) => {
  const requiresSize = ["tirolesa", "palestra"].includes(activity)
  const updateParticipant = (index, field, value) => {
    const updatedParticipants = [...participants]
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value
    }
    onUpdate(updatedParticipants)
  }
  const validateDNI = value => {
    const numericValue = value.replace(/[^0-9]/g, "")
    return numericValue.slice(0, 8)
  }
  const isFormValid = () => {
    return participants.every(
      p =>
        p.firstName.trim() !== "" &&
        p.lastName.trim() !== "" &&
        p.dni.trim() !== "" &&
        p.age.trim() !== "" &&
        (!requiresSize || p.size.trim() !== "")
    )
  }
  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-700">
        Datos de los Participantes
      </h2>
      <p className="text-gray-500 mt-2 mb-6">
        Por favor ingresa los datos de cada participante para la actividad{" "}
        {activity.charAt(0).toUpperCase() + activity.slice(1)}.
      </p>
      <div className="space-y-8">
        {participants.map((person, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-medium text-gray-700">
                Participante {index + 1}
              </h3>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Todos los campos son obligatorios
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Campo Nombre */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor={`firstName-${index}`}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id={`firstName-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={person.firstName}
                  onChange={e =>
                    updateParticipant(index, "firstName", e.target.value)
                  }
                  placeholder="Nombre"
                  required
                />
              </div>

              {/* Campo Apellido */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor={`lastName-${index}`}
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={person.lastName}
                  onChange={e =>
                    updateParticipant(index, "lastName", e.target.value)
                  }
                  placeholder="Apellidos"
                  required
                />
              </div>

              {/* Campo DNI */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor={`dni-${index}`}
                >
                  DNI (8 dígitos)
                </label>
                <input
                  type="text"
                  id={`dni-${index}`}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${
                    person.dni.length === 8
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  value={person.dni}
                  onChange={e =>
                    updateParticipant(index, "dni", validateDNI(e.target.value))
                  }
                  placeholder="00000000"
                  required
                  maxLength={8}
                />
                {person.dni.length > 0 && person.dni.length < 8 && (
                  <p className="text-xs text-red-500 mt-1">
                    El DNI debe tener 8 dígitos
                  </p>
                )}
              </div>

              {/* Campo Edad */}
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor={`age-${index}`}
                >
                  Edad
                </label>
                <input
                  type="text"
                  id={`age-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={person.age}
                  onChange={e => {
                    const value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 3)
                    const numValue = parseInt(value)
                    if (value === "" || (numValue >= 0 && numValue <= 999)) {
                      updateParticipant(index, "age", value)
                    }
                  }}
                  placeholder="Edad"
                  required
                  maxLength={3}
                />
                {person.age && parseInt(person.age) > 120 && (
                  <p className="text-xs text-red-500 mt-1">
                    La edad debe ser menor a 120 años
                  </p>
                )}
              </div>
              
              {/* Campo Talle */}
              {requiresSize && (
                <div className="md:col-span-2">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor={`size-${index}`}
                  >
                    Talla de vestimenta
                  </label>
                  <select
                    id={`size-${index}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={person.size}
                    onChange={e =>
                      updateParticipant(index, "size", e.target.value)
                    }
                    required
                  >
                    <option value="">Selecciona una talla</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid()}
          className={`px-6 py-2 rounded ${
            isFormValid()
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

