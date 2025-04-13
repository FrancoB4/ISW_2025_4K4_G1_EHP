{/* Componente que se encarga de la barra de progreso */}
import React from "react"
export const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = [
    {
      name: "Inicio",
      step: 1
    },
    {
      name: "Inscripción",
      step: 2
    },
    {
      name: "Términos y Condiciones",
      step: 3
    },
    {
      name: "Confirmación",
      step: 4
    }
  ]
  return (
    <div className="flex-1">
      <div className="flex justify-between relative">
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center ${
                currentStep >= step.step ? "bg-green-600" : "bg-gray-200"
              } transition-colors duration-300`}
            >
              {currentStep > step.step ? (
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span
                  className={`text-xs ${
                    currentStep >= step.step ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step.step}
                </span>
              )}
            </div>
            <span className="text-xs mt-2 text-gray-600">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
