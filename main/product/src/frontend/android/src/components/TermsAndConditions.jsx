{/* Componente que se encarga de mostrar los términos y condiciones */}
import React from "react"
import axios from "axios"

export const TermsAndConditions = ({
  activity,
  termsAccepted,
  formData,
  emailLogin,
  onAccept,
  onNext,
  onBack
}) => {

  const visitorsParser = (visitors) => {
    let parsedVisitors = [];
    visitors.forEach(v => {
      parsedVisitors.push({
        visitorName: `${v.firstName} ${v.lastName}`,
        dni: v.dni,
        birthdate: v.birthDate,
        clothingSize: v.size
      })
    });
    return parsedVisitors;
  }

  const createRegistration = async (data, email) => {
    const body = {
      "schedule_id": data.timeSlot,
      "email": email,
      "visitors": visitorsParser(data.people)
    }

    try {
      const res = await axios.post("http://localhost:3001/api/registrations", body);
      console.log("Respuesta del servidor:", res.data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }

  {/* Términos y condiciones harcoded, usa switch case dependiendo de la actividad seleccionada, cambiar si se usa backend */}
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
      <h2 className="text-2xl font-semibold text-primary-dark">
        Términos y Condiciones
      </h2>
      <p className="text-gray-600 mt-2 mb-6 font-normal">
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
            className="mt-1 mr-2 text-primary-sea focus:ring-primary-sea"
          />
          <span className="text-primary-dark">
            He leído y acepto los términos y condiciones para participar en esta
            actividad, y confirmo que todos los participantes cumplen con los
            requisitos establecidos.
          </span>
        </label>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded text-primary-dark hover:bg-gray-50 transition-colors"
        >
          Atrás
        </button>
        <button
          onClick={()=>{
            createRegistration(formData, emailLogin);
            onNext();
          }}
          disabled={!termsAccepted}
          className={`px-6 py-2 rounded transition-colors ${
            termsAccepted
              ? "bg-primary-sea text-white hover:bg-primary-forest"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Confirmar Registro
        </button>
      </div>
    </div>
  )
}
