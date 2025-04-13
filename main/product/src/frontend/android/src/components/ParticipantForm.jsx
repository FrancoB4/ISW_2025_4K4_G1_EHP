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
        p.name.trim() !== "" &&
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
      {participants.map((person, index) => (
        <div key={index} className="mb-8 p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg text-gray-700 mb-4">
            Participante {index + 1}
          </h3>
          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor={`name-${index}`}
            >
              Nombre
            </label>
            <input
              type="text"
              id={`name-${index}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              value={person.name}
              onChange={e => updateParticipant(index, "name", e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          {/* Campo Apellido */}
          <div className="mb-4">
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
              onChange={e => updateParticipant(index, "lastName", e.target.value)}
              placeholder="Apellido"
              required
            />
          </div>
          {/* Campo DNI */}
          <div className="mb-4">
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
                person.dni.length === 8 ? "border-green-500" : "border-gray-300"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor={`age-${index}`}
            >
              Edad
            </label>
            <input
              type="number"
              id={`age-${index}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              value={person.age}
              onChange={e => updateParticipant(index, "age", e.target.value)}
              min="0"
              max="120"
              required
            />
          </div>
          {/* Campo Talle */}
          {requiresSize && (
            <div className="mb-4">
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
                onChange={e => updateParticipant(index, "size", e.target.value)}
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
      ))}
      <div className="mt-6 flex justify-between">
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
