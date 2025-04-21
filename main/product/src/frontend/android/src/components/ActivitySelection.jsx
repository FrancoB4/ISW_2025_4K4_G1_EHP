{/* Componente de seleccion de actividad, aqui se manejan los 4 cuadros de actvidades */}
import React from "react"
import { CompassIcon, MountainIcon, FlowerIcon, CableCar, BoxIcon } from "lucide-react"
export const ActivitySelection = ({
  activities,
  selectedActivity,
  requiredSpots,
  onSelectActivity
}) => {

  //Actividades hardcoded, se puede cambiar si se agrega backend, 
  // capacity = cupos maximos por actividad, 
  // available = harcoded disponibilidad de cupos
  
  // const activities = [
  //   {
  //     id: "tirolesa",
  //     name: "Tirolesa",
  //     capacity: 15,
  //     available: 12,
  //     icon: BoxIcon,
  //     description: "Aventura y adrenalina en las alturas"
  //   },
  //   {
  //     id: "safari",
  //     name: "Safari",
  //     capacity: 20,
  //     available: 8,
  //     icon: CompassIcon,
  //     description: "Explora la naturaleza salvaje"
  //   },
  //   {
  //     id: "palestra",
  //     name: "Palestra",
  //     capacity: 10,
  //     available: 6,
  //     icon: MountainIcon,
  //     description: "Desafía tus límites escalando"
  //   },
  //   {
  //     id: "jardineria",
  //     name: "Jardinería",
  //     capacity: 25,
  //     available: 20,
  //     icon: FlowerIcon,
  //     description: "Conecta con la naturaleza"
  //   }
  // ]
  return (
    <div className="mt-8">
      <h3 className="text-primary-dark font-semibold mb-3">
        Actividades disponibles para {requiredSpots}{" "}
        {requiredSpots === 1 ? "persona" : "personas"}:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map(activity => {
          const Icon = {
            tirolesa: CableCar,
            safari: CompassIcon,
            palestra: MountainIcon,
            jardineria: FlowerIcon
          }[activity.name.toLowerCase()] || BoxIcon
          const isAvailable = activity.available > 0;
          return (
            <button
              key={activity.id}
              className={`p-4 border rounded-md flex items-start transition-colors${
                selectedActivity === activity.id
                  ? "border-primary-sea bg-primary-sea/10"
                  : "border-gray-300"
              } ${
                !isAvailable
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-primary-sea"
              }`}
              onClick={() => isAvailable && onSelectActivity(activity.id)}
              disabled={!isAvailable}
            >
              <Icon className="h-6 w-6 mr-3 text-primary-sea flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-semibold text-primary-dark">{activity.name}</div>
                <div className="text-sm text-gray-500">
                  {activity.description}
                </div>
                <div className="text-sm mt-1">
                  {isAvailable ? (
                    <span className="text-primary-sea">
                      {activity.available} horarios disponibles
                    </span>
                  ) : (
                    <span className="text-red-500">
                      No hay suficientes horarios disponibles
                    </span>
                  )}
                </div>
              </div>
              {selectedActivity === activity.id && (
                <div className="text-primary-sea ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
