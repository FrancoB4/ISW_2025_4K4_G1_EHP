import React from "react"
export const TermsAndConditions = ({
  activity,
  termsAccepted,
  onAccept,
  onNext,
  onBack
}) => {
  // Mock terms content based on activity
  const getTermsContent = () => {
    switch (activity) {
      case "tirolesa":
        return (
          <div>
            <p className="mb-4">
              Al participar en la actividad de Tirolesa, usted acepta las
              siguientes condiciones:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Seguir todas las instrucciones del guía en todo momento.</li>
              <li>Usar el equipo de seguridad proporcionado correctamente.</li>
              <li>No estar bajo la influencia del alcohol o drogas.</li>
              <li>Tener un peso entre 40kg y 110kg.</li>
              <li>
                No tener problemas cardíacos, de presión arterial o estar
                embarazada.
              </li>
              <li>
                EcoHarmony Park no se hace responsable por accidentes causados
                por incumplimiento de las normas de seguridad.
              </li>
            </ul>
          </div>
        )
      case "safari":
        return (
          <div>
            <p className="mb-4">
              Al participar en la actividad de Safari, usted acepta las
              siguientes condiciones:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>No alimentar a los animales bajo ninguna circunstancia.</li>
              <li>Mantener la distancia de seguridad indicada por el guía.</li>
              <li>No bajarse del vehículo a menos que el guía lo indique.</li>
              <li>
                No hacer ruidos fuertes que puedan asustar a los animales.
              </li>
              <li>
                No arrojar basura o cualquier objeto durante el recorrido.
              </li>
              <li>
                EcoHarmony Park no se hace responsable por accidentes causados
                por incumplimiento de las normas de seguridad.
              </li>
            </ul>
          </div>
        )
      case "palestra":
        return (
          <div>
            <p className="mb-4">
              Al participar en la actividad de Palestra, usted acepta las
              siguientes condiciones:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                Seguir todas las instrucciones del instructor en todo momento.
              </li>
              <li>Usar el equipo de seguridad proporcionado correctamente.</li>
              <li>No estar bajo la influencia del alcohol o drogas.</li>
              <li>
                Informar al instructor sobre cualquier condición médica
                relevante.
              </li>
              <li>
                No tener problemas cardíacos, de presión arterial o estar
                embarazada.
              </li>
              <li>
                EcoHarmony Park no se hace responsable por accidentes causados
                por incumplimiento de las normas de seguridad.
              </li>
            </ul>
          </div>
        )
      case "jardineria":
        return (
          <div>
            <p className="mb-4">
              Al participar en la actividad de Jardinería, usted acepta las
              siguientes condiciones:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                Utilizar las herramientas proporcionadas de manera adecuada y
                segura.
              </li>
              <li>
                Seguir las instrucciones del guía sobre qué plantas manipular.
              </li>
              <li>No arrancar plantas sin autorización previa.</li>
              <li>Usar guantes de protección en todo momento.</li>
              <li>
                No utilizar pesticidas o productos químicos no autorizados.
              </li>
              <li>
                EcoHarmony Park no se hace responsable por accidentes causados
                por incumplimiento de las normas de seguridad.
              </li>
            </ul>
          </div>
        )
      default:
        return (
          <p>
            Por favor, lea atentamente los términos y condiciones de la
            actividad.
          </p>
        )
    }
  }
  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-700">
        Términos y Condiciones
      </h2>
      <p className="text-gray-500 mt-2 mb-6">
        Por favor lee y acepta los términos y condiciones específicos para la
        actividad {activity.charAt(0).toUpperCase() + activity.slice(1)}.
      </p>
      <div className="border border-gray-300 rounded-md p-4 h-64 overflow-y-auto bg-gray-50 mb-6">
        {getTermsContent()}
      </div>
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={e => onAccept(e.target.checked)}
            className="mt-1 mr-2"
          />
          <span className="text-gray-700">
            He leído y acepto los términos y condiciones para participar en esta
            actividad, y confirmo que todos los participantes cumplen con los
            requisitos establecidos.
          </span>
        </label>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!termsAccepted}
          className={`px-6 py-2 rounded ${
            termsAccepted
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Confirmar Registro
        </button>
      </div>
    </div>
  )
}
