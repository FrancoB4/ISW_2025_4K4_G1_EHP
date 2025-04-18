{/* Parte principal de la pagina, maneja los estados  va cambiando entre las opciones, los otros components ayudan a este */}

import React, { useState, useEffect } from "react"
import { ActivitySelection } from "./ActivitySelection"
import { TimeSelection } from "./TimeSelection"
import { ParticipantForm } from "./ParticipantForm"
import { TermsAndConditions } from "./TermsAndConditions"
import { NumberOfParticipants } from "./NumberOfParticipants"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "lucide-react"
import axios from 'axios';

// Pone pm y am a las horas
const getTimeDisplay = time => {
  const [hours] = time.split(":")
  const hour = parseInt(hours, 10)
  if (hour < 12) {
    return `${time} AM`
  } else if (hour === 12) {
    return `${time} PM`
  } else {
    return `${hour - 12}:00 PM`
  }
}
export const ActivityRegistration = ({
  currentStep,
  setCurrentStep,
  totalSteps
}) => {
  const [formData, setFormData] = useState({
    participants: 0,
    activity: "",
    selectedDate: null,
    timeSlot: "",
    people: [],
    termsAccepted: false
  })

  const [activities, setActivities] = useState([]);

  const updateFormData = data => {
    setFormData(prev => ({
      ...prev,
      ...data
    }))
  }
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 1)
  const filterDate = date => {
    const day = date.getDay()
    return day !== 2 && day !== 4
  }

  const formatDate = (selectedDate) => {
    const date = new Date(selectedDate);

    const dd = String(date.getDate()).padStart(2, '0');       // Asegura "01", "02", ..., "31"
    const mm = String(date.getMonth() + 1).padStart(2, '0');  // Asegura "01", "02", ..., "12"
    const yyyy = date.getFullYear();
    
    return `${dd}/${mm}/${yyyy}`;
  }


  {/* Cambio de aspecto de la pagina dependiendo del "Step" o paso en el que se encuentre
    Case 1: paginia inicial de seleccion de actividad
    Case 2: pagina de inscripcion de cada participante
    Case 3: pagina de terminos y condiciones
    Case 4: pagina de confirmacion y retorno */}

    useEffect(() => {
      const { selectedDate, participants } = formData;

      if (!selectedDate || !participants) return;
      
      const formattedDate = formatDate(selectedDate);

      axios.get(`http://localhost:3001/api/activities?fecha=${formattedDate}&personas=${participants}`)
        .then(res => {
          setActivities(res.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, [formData.selectedDate, formData.participants])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-medium text-gray-700">
              Formulario de Inscripción
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              Bienvenido al formulario de inscripción de actividades de
              EcoHarmony Park. Para comenzar, indica el número de participantes
              que desean realizar la actividad.
            </p>
            <NumberOfParticipants
              selectedCount={formData.participants}
              onSelectCount={count => {
                const people = Array(count)
                  .fill(0)
                  .map(() => ({
                    firstName: "",
                    lastName: "",
                    dni: "",
                    age: "",
                    size: ""
                  }))
                updateFormData({
                  participants: count,
                  people
                })
              }}
            />
            {formData.participants > 0 && (
              <div className="mt-8">
                <h3 className="text-gray-700 mb-3 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-green-600" />
                  Selecciona una fecha:
                </h3>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <DatePicker
                    selected={formData.selectedDate}
                    onChange={date =>{
                      updateFormData({
                        selectedDate: date
                      })
                    }}
                    minDate={minDate}
                    maxDate={maxDate}
                    filterDate={filterDate}
                    dateFormat="dd/MM/yyyy"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholderText="Selecciona una fecha"
                  />
                </div>
              </div>
            )}
            {formData.selectedDate && (
              <ActivitySelection
                activities={activities}
                selectedActivity={formData.activity}
                requiredSpots={formData.participants}
                onSelectActivity={activity =>
                  updateFormData({
                    activity,
                    timeSlot: "" // Resetea time slot cuando se cambia de actividad
                  })
                }
              />
            )}
            {formData.activity && (
              <TimeSelection
                selectedDate={formData.selectedDate}
                selectedActivity={formData.activity}
                selectedTime={formData.timeSlot}
                requiredSpots={formData.participants}
                onSelectTime={timeSlot =>
                  updateFormData({
                    timeSlot
                  })
                }
              />
            )}
            {formData.timeSlot && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <ParticipantForm
            participants={formData.people}
            activity={formData.activity}
            onUpdate={people =>
              updateFormData({
                people
              })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <TermsAndConditions
            activity={formData.activity}
            termsAccepted={formData.termsAccepted}
            onAccept={termsAccepted =>
              updateFormData({
                termsAccepted
              })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-medium text-gray-700">Confirmación</h2>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
              <p>¡Registro completado con éxito!</p>
              <p className="mt-2">
                Has reservado la actividad{" "}
                {formData.activity.charAt(0).toUpperCase() +
                  formData.activity.slice(1)}{" "}
                para {formData.participants}{" "}
                {formData.participants > 1 ? "personas" : "persona"} el{" "}
                {formData.selectedDate?.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}{" "}
                a las {getTimeDisplay(formData.timeSlot)}.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setCurrentStep(1)
                  setFormData({
                    activity: "",
                    timeSlot: "",
                    participants: 0,
                    selectedDate: null,
                    people: [],
                    termsAccepted: false
                  })
                }}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Registrar otra actividad
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  return <div className="bg-white p-6 rounded-lg shadow-sm">{renderStep()}</div>
}
