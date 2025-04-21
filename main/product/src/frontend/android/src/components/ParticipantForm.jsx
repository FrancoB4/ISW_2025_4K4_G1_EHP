{/* Componente que se encarga del formulario de cada participante */}
import React from "react"
import DatePicker from "react-datepicker"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
export const ParticipantForm = ({
  participants,
  activity,
  onUpdate,
  onNext,
  onBack
}) => {
  const requiresSize = ["tirolesa", "palestra", "jardineria"].includes(activity)
  
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
  const calculateAge = birthDate => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  const isFormValid = () => {
    return participants.every(
      p =>
        p.firstName.trim() !== "" &&
        p.lastName.trim() !== "" &&
        p.dni.trim() !== "" &&
        p.birthDate !== null &&
        (!requiresSize || p.size.trim() !== "") &&
        (p.birthDate ? calculateAge(p.birthDate) <= 120 : true)
    )
  }
  const maxDate = new Date()
  const minDate = new Date()
  minDate.setFullYear(maxDate.getFullYear() - 120)
  const datePickerWrapperStyles = `
    .react-datepicker-wrapper {
      width: 100%;
    }
    .react-datepicker__input-container {
      width: 100%;
    }
    .react-datepicker-popper {
      z-index: 10;
    }`
    
  return (
    <div>
      <style>{`{datePickerWrapperStyles}`}</style>
      <h2 className="text-2xl font-semibold text-primary-dark">
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
              <h3 className="text-lg font-semibold text-primary-dark">
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
                  className="block text-primary-dark text-sm font-medium mb-2"
                  htmlFor={`firstName-${index}`}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id={`firstName-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-sea"
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
                  className="block text-primary-dark text-sm font-medium mb-2"
                  htmlFor={`lastName-${index}`}
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-sea"
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
                  className="block text-primary-dark text-sm font-medium mb-2"
                  htmlFor={`dni-${index}`}
                >
                  DNI (8 dígitos)
                </label>
                <input
                  type="text"
                  id={`dni-${index}`}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-sea ${

                    person.dni.length === 8

                      ? "border-primary-sea"

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

              {/* Campo Fecha de nacimiento */}
              <div>
                <label
                  className="block text-primary-dark text-sm font-medium mb-2"
                  htmlFor={`birthDate-${index}`}
                >
                  Fecha de nacimiento
                </label>
                <div className="relative w-full">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <DatePicker
                    selected={person.birthDate}
                    onChange={date =>
                      updateParticipant(index, "birthDate", date)
                    }
                    dateFormat="dd/MM/yyyy"
                    maxDate={maxDate}
                    minDate={minDate}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={120}
                    locale={es}
                    placeholderText="Selecciona una fecha"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-sea bg-white"
                    wrapperClassName="w-full"
                    popperClassName="datepicker-popper"
                    dropdownMode="select"
                  />
                </div>
                {person.birthDate && calculateAge(person.birthDate) > 120 && (
                  <p className="text-xs text-red-500 mt-1">
                    La edad máxima permitida es 120 años
                  </p>
                )}
              </div>
              
              {/* Campo Talle */}
              {requiresSize && (
                <div className="md:col-span-2">
                  <label
                    className="block text-primary-dark text-sm font-medium mb-2"
                    htmlFor={`size-${index}`}
                  >
                    Talla de vestimenta
                  </label>
                  <select
                    id={`size-${index}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-sea"
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
          className={`px-6 py-2 rounded transition-colors ${
            isFormValid()
              ? "bg-primary-sea text-white hover:bg-primary-forest"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

