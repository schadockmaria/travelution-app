'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import { de } from 'date-fns/locale';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  
  useEffect(() => {
    // Get all days of the current month
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({
      start: monthStart,
      end: monthEnd
    });
    
    // Add padding days from previous month to start the week on Monday
    const startDay = getDay(monthStart);
    const startPadding = startDay === 0 ? 6 : startDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    const paddedDays = [];
    
    // Add days from previous month
    for (let i = 0; i < startPadding; i++) {
      const date = new Date(monthStart);
      date.setDate(-startPadding + i + 1);
      paddedDays.push(date);
    }
    
    // Add days of current month
    paddedDays.push(...daysInMonth);
    
    // Add days from next month to complete the grid (6 rows)
    const totalCells = Math.ceil(paddedDays.length / 7) * 7;
    const remainingDays = totalCells - paddedDays.length;
    
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(monthEnd);
      date.setDate(monthEnd.getDate() + i);
      paddedDays.push(date);
    }
    
    setDays(paddedDays);
  }, [currentDate]);
  
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const today = new Date();
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Vorheriger Monat"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#12325A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h2 className="text-lg font-semibold text-[#12325A]">
          {format(currentDate, 'MMMM yyyy', { locale: de })}
        </h2>
        
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Nächster Monat"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#12325A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayDate = isSameDay(day, today);
          const isSelected = false; // You can implement selection logic if needed
          
          return (
            <div 
              key={index}
              className={`
                aspect-square flex items-center justify-center rounded-full text-sm
                ${!isCurrentMonth ? 'text-gray-300' : 'text-[#12325A]'}
                ${isTodayDate && isCurrentMonth ? 'bg-[#FF7A20] text-white' : ''}
                ${isSelected ? 'bg-blue-100 text-blue-700' : ''}
                ${isCurrentMonth && !isTodayDate ? 'hover:bg-gray-100' : ''}
              `}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
