'use client';

import { useState, useEffect } from 'react';
import { format, addDays, isToday, isTomorrow, isAfter, differenceInDays } from 'date-fns';
import { FiPlus } from 'react-icons/fi';
import { de } from 'date-fns/locale';
import Calendar from '../../components/Calendar';

interface Trip {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
}

type PackingItem = {
  id: string;
  name: string;
  packed: boolean;
  category: string;
};

const defaultItems: PackingItem[] = [
  { id: '1', name: 'Reisepass', packed: true, category: 'Reisedokumente' },
  { id: '2', name: 'Flugtickets', packed: false, category: 'Reisedokumente' },
  { id: '3', name: 'Kreditkarte', packed: true, category: 'Reisedokumente' },
  { id: '4', name: 'T-Shirts', packed: false, category: 'Kleidung' },
  { id: '5', name: 'Hose', packed: false, category: 'Kleidung' },
  { id: '6', name: 'Regenjacke', packed: false, category: 'Kleidung' },
  { id: '7', name: 'Smartphone', packed: true, category: 'Technik' },
  { id: '8', name: 'Ladekabel', packed: false, category: 'Technik' },
  { id: '9', name: 'Powerbank', packed: false, category: 'Technik' },
  { id: '10', name: 'Kopfhörer', packed: true, category: 'Technik' },
];

const categories = [
  { id: '1', name: 'Reisedokumente' },
  { id: '2', name: 'Kleidung' },
  { id: '3', name: 'Technik' },
  { id: '4', name: 'Toilettenartikel' },
  { id: '5', name: 'Erste Hilfe' },
];

export default function PlanenPage() {
  const [items, setItems] = useState<PackingItem[]>(defaultItems);
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showTripForm, setShowTripForm] = useState(false);
  const [newTrip, setNewTrip] = useState<Omit<Trip, 'id'>>({ 
    destination: '', 
    startDate: new Date(), 
    endDate: addDays(new Date(), 3) 
  });
  const [nextTrip, setNextTrip] = useState<Trip | null>(null);
  const [daysUntilTrip, setDaysUntilTrip] = useState<number | null>(null);

  // Load trips from localStorage on component mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    if (savedTrips) {
      const parsedTrips = JSON.parse(savedTrips).map((trip: any) => ({
        ...trip,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate)
      }));
      setTrips(parsedTrips);
    } else {
      // Add default Bali trip if no trips exist
      const today = new Date();
      const defaultTrip = {
        id: 'default-bali-trip',
        destination: 'Bali, Indonesien',
        startDate: addDays(today, 15),
        endDate: addDays(today, 29) // 2 weeks in Bali
      };
      setTrips([defaultTrip]);
      localStorage.setItem('trips', JSON.stringify([{
        ...defaultTrip,
        startDate: defaultTrip.startDate.toISOString(),
        endDate: defaultTrip.endDate.toISOString()
      }]));
    }
  }, []);

  // Update next trip and days until trip when trips change
  useEffect(() => {
    const today = new Date();
    const upcomingTrips = trips
      .filter(trip => isAfter(trip.startDate, today) || isToday(trip.startDate) || isAfter(trip.endDate, today))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    if (upcomingTrips.length > 0) {
      const next = upcomingTrips[0];
      setNextTrip(next);
      const diff = differenceInDays(next.startDate, today);
      setDaysUntilTrip(diff >= 0 ? diff : 0);
    } else {
      setNextTrip(null);
      setDaysUntilTrip(null);
    }
  }, [trips]);

  const addTrip = () => {
    const newTripWithId = {
      ...newTrip,
      id: Date.now().toString(),
    };
    const updatedTrips = [...trips, newTripWithId];
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setShowTripForm(false);
    setNewTrip({ 
      destination: '', 
      startDate: new Date(), 
      endDate: addDays(new Date(), 3) 
    });
  };

  const removeTrip = (id: string) => {
    const updatedTrips = trips.filter(trip => trip.id !== id);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const addNewItem = () => {
    if (newItemName.trim() && selectedCategory) {
      const newItem: PackingItem = {
        id: Date.now().toString(),
        name: newItemName,
        packed: false,
        category: selectedCategory
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setSelectedCategory('');
      setShowAddForm(false);
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getItemsByCategory = (category: string) => {
    return items.filter(item => item.category === category);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    // Optional: Scroll to the form or open a modal
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white p-5 pb-32 relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#12325A] mb-1">Planen</h1>
        <p className="text-[#12325A] opacity-80">Verwalte deine Reisen und Packlisten</p>
      </div>

      {/* Countdown Timer Section */}
      <div className="bg-[#FFF5EB] rounded-xl p-4 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#12325A] mb-2">
            {nextTrip 
              ? (() => {
                  const today = new Date();
                  if (isToday(nextTrip.startDate)) {
                    return 'Reise startet heute!';
                  } else if (isTomorrow(nextTrip.startDate)) {
                    return 'Reise startet morgen!';
                  } else {
                    return `Nächste Reise in ${daysUntilTrip} ${daysUntilTrip === 1 ? 'Tag' : 'Tagen'}`;
                  }
                })()
              : 'Keine anstehende Reise geplant'}
          </h2>
          {nextTrip && (
            <div className="text-[#12325A] text-sm mb-3">
              <div className="font-medium">{nextTrip.destination}</div>
              <div className="opacity-80">
                {format(nextTrip.startDate, 'dd.MM.yyyy', { locale: de })} - {format(nextTrip.endDate, 'dd.MM.yyyy', { locale: de })}
              </div>
            </div>
          )}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            {nextTrip && daysUntilTrip !== null && daysUntilTrip <= 30 ? (
              <div 
                className="bg-[#FF7A00] h-2.5 rounded-full" 
                style={{ width: `${Math.max(5, 100 - (daysUntilTrip / 30) * 100)}%` }}
              />
            ) : (
              <div className="bg-gray-300 h-2.5 rounded-full w-full" />
            )}
          </div>
        </div>

        {/* Calendar Component */}
        <Calendar />

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-[#12325A]">Meine Reisen</h3>
            <button 
              onClick={() => setShowTripForm(true)}
              className="text-sm text-[#FF7A00] font-medium"
            >
              + Reise hinzufügen
            </button>
          </div>
          
          {trips.length > 0 ? (
            <div className="space-y-2">
              {trips
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                .map(trip => (
                  <div key={trip.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                    <div>
                      <div className="font-medium text-[#12325A]">{trip.destination}</div>
                      <div className="text-xs text-gray-500">
                        {format(trip.startDate, 'dd.MM.yy', { locale: de })} - {format(trip.endDate, 'dd.MM.yy', { locale: de })}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeTrip(trip.id)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label="Reise entfernen"
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">
              Noch keine Reisen geplant
            </p>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold text-[#12325A] mb-4">Meine Planung</h2>

      {categories.map(category => {
        const categoryItems = getItemsByCategory(category.name);
        if (categoryItems.length === 0) return null;
        
        const packedCount = categoryItems.filter(i => i.packed).length;
        const totalCount = categoryItems.length;
        
        return (
          <div key={category.id} className="mb-5">
            <div className="flex justify-between items-center mb-3 px-1">
              <h2 className="text-lg font-semibold text-[#12325A]">{category.name}</h2>
              <span className="text-sm text-[#12325A] opacity-80">
                {packedCount}/{totalCount}
              </span>
            </div>
            
            <div className="space-y-2">
              {categoryItems.map(item => (
                <div 
                  key={item.id} 
                  className={`flex items-center p-3 rounded-xl border-2 ${item.packed ? 'bg-[#FF7A00] border-[#FF7A00]' : 'bg-white border-[#FF7A00]'}`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3 ${item.packed ? 'bg-white' : 'border-2 border-[#12325A]'}`}
                  />
                  <span className={`flex-grow ${item.packed ? 'text-white' : 'text-[#12325A]'}`}>
                    {item.name}
                  </span>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className={`text-sm font-medium ml-2 ${item.packed ? 'text-white opacity-70' : 'text-[#12325A] opacity-50'}`}
                  >
                    Löschen
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Add Item Button */}
      <div className="mt-6 mb-8">
        <button 
          onClick={() => setShowAddForm(true)}
          className="w-full py-4 border-2 border-dashed border-[#FF7A00] rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-orange-50 transition-colors"
        >
          <FiPlus className="text-[#FF7A00] text-2xl" />
          <span className="text-[#FF7A00] font-medium">Neuen Gegenstand hinzufügen</span>
        </button>
      </div>

      {/* Add Trip Modal */}
      {showTripForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-[400px]">
            <h3 className="text-lg font-semibold text-[#12325A] mb-4">Neue Reise hinzufügen</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#12325A] mb-1">
                  Reiseziel
                </label>
                <input
                  type="text"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12325A] focus:border-[#12325A] outline-none"
                  placeholder="z.B. Mallorca, Spanien"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#12325A] mb-1">
                    Von
                  </label>
                  <input
                    type="date"
                    value={format(newTrip.startDate, 'yyyy-MM-dd')}
                    onChange={(e) => setNewTrip({...newTrip, startDate: new Date(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12325A] focus:border-[#12325A] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#12325A] mb-1">
                    Bis
                  </label>
                  <input
                    type="date"
                    value={format(newTrip.endDate, 'yyyy-MM-dd')}
                    min={format(newTrip.startDate, 'yyyy-MM-dd')}
                    onChange={(e) => setNewTrip({...newTrip, endDate: new Date(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12325A] focus:border-[#12325A] outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowTripForm(false)}
                  className="px-4 py-2 text-sm font-medium text-[#12325A] hover:bg-gray-100 rounded-xl"
                >
                  Abbrechen
                </button>
                <button
                  onClick={addTrip}
                  disabled={!newTrip.destination.trim() || !newTrip.startDate || !newTrip.endDate}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#FF7A00] rounded-xl hover:bg-[#e66a00] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Speichern
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-[400px]">
            <h3 className="text-lg font-semibold text-[#12325A] mb-4">Neuen Gegenstand hinzufügen</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#12325A] mb-1">
                  Bezeichnung
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12325A] focus:border-[#12325A] outline-none"
                  placeholder="z.B. Zahnbürste"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#12325A] mb-1">
                  Kategorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12325A] focus:border-[#12325A] outline-none appearance-none bg-white"
                >
                  <option value="">Kategorie auswählen</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-medium text-[#12325A] hover:bg-gray-100 rounded-xl"
                >
                  Abbrechen
                </button>
                <button
                  onClick={addNewItem}
                  disabled={!newItemName.trim() || !selectedCategory}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#12325A] rounded-xl hover:bg-[#0f2a4a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleAddClick}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-[#FF7A00] flex items-center justify-center shadow-lg hover:bg-[#e66a00] transition-colors duration-200 z-40"
        aria-label="Neuen Gegenstand hinzufügen"
      >
        <FiPlus className="text-white text-2xl" />
      </button>
    </div>
  );
}
