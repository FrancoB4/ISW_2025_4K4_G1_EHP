import React, { useState } from "react"
import { ProgressBar } from "./components/ProgressBar"
import { ActivityRegistration } from "./components/ActivityRegistration"
export function App({
  emailLogin
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <header className="bg-green-600 py-2 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-white text-sm">
            Completa tu registro para disfrutar de nuestras actividades
          </div>
        </div>
      </header>
      {/* Logo y Navegacion */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-600 ml-2">
                EcoHarmony Park
              </h1>
            </div>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>
      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <ActivityRegistration
          emailLogin={emailLogin}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          totalSteps={totalSteps}
        />
      </main>
    </div>
  )
}
