import React, { useState } from "react"
import { ProgressBar } from "./components/ProgressBar"
import { ActivityRegistration } from "./components/ActivityRegistration"
import ehpIcon from './assets/icons/EHP_ICON_01.png';
export function App({
  emailLogin
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <header className="bg-primary-forest py-3 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-white text-sm">
            Completa tu registro para disfrutar de nuestras actividades
          </div>
        </div>
      </header>
      {/* Logo y Navegacion */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div className="flex items-center">
              {/* Logo del parque*/}
              <img
                src={ehpIcon}
                alt="EcoHarmony Park Logo"
                className="h-16 w-16 sm:h-24 sm:w-24 object-contain"
              />
              <h1 className="text-2xl sm:text-4xl font-semibold text-primary-dark ml-3 sm:ml-5 break-words">
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
