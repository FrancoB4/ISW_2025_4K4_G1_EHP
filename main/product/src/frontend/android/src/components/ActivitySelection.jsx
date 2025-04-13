import React from "react"
import { CompassIcon, MountainIcon, FlowerIcon, BoxIcon } from "lucide-react"
export const ActivitySelection = ({ selectedActivity, onSelectActivity }) => {
  const activities = [
    {
      id: "tirolesa",
      name: "Tirolesa",
      available: true,
      icon: BoxIcon,
      description: "Aventura y adrenalina en las alturas"
    },
    {
      id: "safari",
      name: "Safari",
      available: true,
      icon: CompassIcon,
      description: "Explora la naturaleza salvaje"
    },
    {
      id: "palestra",
      name: "Palestra",
      available: true,
      icon: MountainIcon,
      description: "Desafía tus límites escalando"
    },
    {
      id: "jardineria",
      name: "Jardinería",
      available: true,
      icon: FlowerIcon,
      description: "Conecta con la naturaleza"
    }
  ]
  return (
    <div>
      <h3 className="text-gray-700 mb-3">Selecciona una actividad:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map(activity => {
          const Icon = activity.icon
          return (
            <button
              key={activity.id}
              className={`p-4 border rounded-md flex items-start ${
                selectedActivity === activity.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              } ${
                !activity.available
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-green-600"
              }`}
              onClick={() =>
                activity.available && onSelectActivity(activity.id)
              }
              disabled={!activity.available}
            >
              <Icon className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-medium">{activity.name}</div>
                <div className="text-sm text-gray-500">
                  {activity.description}
                </div>
                {!activity.available && (
                  <span className="text-xs text-red-500">No disponible</span>
                )}
              </div>
              {selectedActivity === activity.id && (
                <div className="text-green-600 ml-2">
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
