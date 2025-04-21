{/* Componente que se encarga del calendario*/}
//la verdad no estoy muy seguro de como funciona, lo saque de un calendario hehco por ahi xd

import React, { useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfWeek,
  endOfWeek
} from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react"
export const Calendar = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date()
  const maxDate = addMonths(today, 1)
  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ]
  const weekDaysShort = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  
  //Harcodeado que los martes y jueves el parque esta cerrado
  const isDateDisabled = date => {
    const day = date.getDay()
    return (
      day === 2 ||
      // Martes
      day === 4 ||
      // Jueves
      isBefore(date, today) ||
      (!isToday(date) && isBefore(date, today)) ||
      isBefore(maxDate, date)
    )
  }

  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(currentMonth), {
      locale: es
    })
    const end = endOfWeek(endOfMonth(currentMonth), {
      locale: es
    })
    return eachDayOfInterval({
      start,
      end
    })
  }
  // esto para limitar de la fecha actual a un mes en adelante la seleccion
  const days = getDaysInMonth()
  const goToPreviousMonth = () => {
    const previousMonth = subMonths(currentMonth, 1)
    if (!isBefore(startOfMonth(previousMonth), startOfMonth(today))) {
      setCurrentMonth(previousMonth)
    }
  }
  const goToNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1)
    if (!isBefore(maxDate, startOfMonth(nextMonth))) {
      setCurrentMonth(nextMonth)
    }
  }
  const canGoToPreviousMonth = !isBefore(
    startOfMonth(subMonths(currentMonth, 1)),
    startOfMonth(today)
  )
  const canGoToNextMonth = !isBefore(
    maxDate,
    startOfMonth(addMonths(currentMonth, 1))
  )
  return (
    <div className="mt-8 relative">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center focus:outline-none focus:ring-2 focus:ring-primary-sea focus:border-transparent"
        >
          <CalendarIcon className="h-5 w-5 text-primary-sea mr-2" />
          <span className="flex-1 text-left">
            {selectedDate
              ? format(selectedDate, "d 'de' MMMM, yyyy", {
                  locale: es
                })
              : "Selecciona una fecha"}
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-full">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              disabled={!canGoToPreviousMonth}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                !canGoToPreviousMonth ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-gray-700 font-medium">
              {format(currentMonth, "MMMM yyyy", {
                locale: es
              })}
            </span>
            <button
              onClick={goToNextMonth}
              disabled={!canGoToNextMonth}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                !canGoToNextMonth ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekDaysShort.map(day => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-700 py-2"
                title={weekDays[weekDaysShort.indexOf(day)]}
              >
                {day}
              </div>
            ))}
            {days.map((day, i) => {
              const disabled = isDateDisabled(day)
              const isSelected = selectedDate && isSameDay(selectedDate, day)
              const isCurrentMonth = isSameMonth(day, currentMonth)
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (!disabled) {
                      onSelectDate(day)
                      setIsOpen(false)
                    }
                  }}
                  disabled={disabled}
                  className={`
                    py-2 rounded-md text-sm font-medium transition-colors
                    ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                    ${
                      disabled
                        ? "cursor-not-allowed bg-gray-50 text-gray-300"
                        : "hover:bg-primary-sea/10"
                    }
                    ${
                      isSelected
                        ? "bg-primary-sea text-white hover:bg-primary-forest"
                        : ""
                    }
                    ${
                      isToday(day) && !isSelected
                        ? "border-2 border-primary-sea"
                        : ""
                    }
                  `}
                  title={format(day, "EEEE d 'de' MMMM, yyyy", {
                    locale: es
                  })}
                >
                  {format(day, "d")}
                </button>
              )
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 flex items-center text-xs text-gray-500 justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full border-2 border-primary-sea mr-1"></div>
              <span>Hoy</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-50 mr-1"></div>
              <span>No disponible</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
