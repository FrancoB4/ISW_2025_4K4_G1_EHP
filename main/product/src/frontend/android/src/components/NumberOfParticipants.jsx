{/* Componente que se encarga de tomar el numero de participantes*/}

import React from "react"
import { UsersIcon, MinusIcon, PlusIcon } from "lucide-react"
export const NumberOfParticipants = ({ selectedCount, onSelectCount }) => {
  const handleIncrement = () => {
    if (selectedCount < 99) {
      onSelectCount(selectedCount + 1)
    }
  }
  const handleDecrement = () => {
    if (selectedCount > 1) {
      onSelectCount(selectedCount - 1)
    }
  }
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-primary-dark text-lg font-medium mb-4 flex items-center">
        <UsersIcon className="w-5 h-5 mr-2 text-primary-sea" />
        ¿Cuántas personas participarán?
      </h3>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={selectedCount <= 1}
          className={`p-2 rounded-full border ${
            selectedCount <= 1
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-600 hover:border-primary-sea hover:text-primary-sea"
          }`}
        >
          <MinusIcon className="w-5 h-5" />
        </button>
        <div className="w-20 relative">
          <input
            type="number"
            min="1"
            max="99"
            value={selectedCount || ""}
            onChange={e => {
              const value = parseInt(e.target.value)
              if (!isNaN(value) && value > 0 && value < 100) {
                onSelectCount(value)
              }
            }}
            className="w-full px-3 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-sea text-lg font-medium"
          />
          <span className="absolute -bottom-6 left-0 right-0 text-center text-sm text-gray-500">
            personas
          </span>
        </div>
        <button
          onClick={handleIncrement}
          disabled={selectedCount >= 99}
          className={`p-2 rounded-full border ${
            selectedCount >= 99
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-600 hover:border-primary-sea hover:text-primary-sea"
          }`}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-8 text-center">
        Ingresa el número de participantes para ver las actividades disponibles
      </p>
    </div>
  )
}
