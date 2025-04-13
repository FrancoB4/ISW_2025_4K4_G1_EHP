import React, { useState } from "react"
import { ActivitySelection } from "./ActivitySelection"
import { TimeSelection } from "./TimeSelection"
import { ParticipantForm } from "./ParticipantForm"
import { TermsAndConditions } from "./TermsAndConditions"
export const ActivityRegistration = ({
  currentStep,
  setCurrentStep,
  totalSteps
}) => {
  const [formData, setFormData] = useState({
    activity: "",
    timeSlot: "",
    participants: 1,
    people: [
      {
        name: "",
        lastName: "",
        dni: "",
        age: "",
        size: ""
      }
    ],
    termsAccepted: false
  })
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
  const getTimeDisplay = timeSlotId => {
    const timeMap = {
      morning: "09:00 AM",
      noon: "12:00 PM",
      afternoon: "03:00 PM",
      evening: "06:00 PM"
    }
    return timeMap[timeSlotId] || timeSlotId
  }
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
              EcoHarmony Park. Por favor, selecciona la actividad en la que
              deseas participar, el horario que prefieras y el número de
              participantes. Asegúrate de tener los datos de todos los
              participantes antes de continuar.
            </p>
            <ActivitySelection
              selectedActivity={formData.activity}
              onSelectActivity={activity =>
                updateFormData({
                  activity
                })
              }
            />
            {formData.activity && (
              <TimeSelection
                selectedActivity={formData.activity}
                selectedTime={formData.timeSlot}
                onSelectTime={timeSlot =>
                  updateFormData({
                    timeSlot
                  })
                }
              />
            )}
            {formData.timeSlot && (
              <div className="mt-8">
                <h3 className="text-gray-700 mb-3">
                  ¿Cuántas personas participarán?
                </h3>
                <div className="flex space-x-4">
                  {[1, 2, 4, 6].map(num => (
                    <button
                      key={num}
                      className={`py-3 w-24 border ${
                        formData.participants === num
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                      onClick={() => {
                        const people = Array(num)
                          .fill(0)
                          .map((_, i) =>
                            i < formData.people.length
                              ? formData.people[i]
                              : {
                                  name: "",
                                  lastName: "",
                                  dni: "",
                                  age: "",
                                  size: ""
                                }
                          )
                        updateFormData({
                          participants: num,
                          people
                        })
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Recomendamos grupos de entre 1 y 6 personas para una mejor
                  experiencia.
                </p>
              </div>
            )}
            {formData.activity &&
              formData.timeSlot &&
              formData.participants > 0 && (
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
                {formData.participants > 1 ? "personas" : "persona"} a las{" "}
                {getTimeDisplay(formData.timeSlot)}.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setCurrentStep(1)
                  setFormData({
                    activity: "",
                    timeSlot: "",
                    participants: 1,
                    people: [
                      {
                        name: "",
                        lastName: "",
                        dni: "",
                        age: "",
                        size: ""
                      }
                    ],
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
