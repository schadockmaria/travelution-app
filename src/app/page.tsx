"use client";

import { FiMapPin, FiCalendar, FiGlobe, FiAward, FiNavigation } from 'react-icons/fi';

const stats = [
  { id: 1, name: 'Besuchte Länder', value: '12', icon: <FiGlobe className="text-[#FF7A00]" /> },
  { id: 2, name: 'Reisen', value: '24', icon: <FiNavigation className="text-[#FF7A00]" /> },
  { id: 3, name: 'Tage', value: '187', icon: <FiCalendar className="text-[#FF7A00]" /> },
  { id: 4, name: 'Erfolge', value: '8', icon: <FiAward className="text-[#FF7A00]" /> },
];

interface Accommodation {
  id: number;
  name: string;
  checkIn: string;
  checkOut: string;
  address: string;
  city: string;
  country: string;
  image?: string;
}

const accommodations: Accommodation[] = [
  {
    id: 1,
    name: 'Bambu Indah Resort',
    checkIn: '19.12.2025',
    checkOut: '02.01.2026',
    address: 'Jl. Baung, Sayan, Kecamatan Ubud, Kabupaten Gianyar',
    city: 'Bali',
    country: 'Indonesien',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Orange Banner */}
      <div className="bg-white">
        <div className="bg-[#FF7A00] pt-10 pb-8 px-6 rounded-b-3xl">
          <h1 className="text-3xl font-bold text-white text-center">
            TEST BANNER
          </h1>
        </div>
      </div>

      {/* Weißer Inhalt darunter */}
      <div className="bg-[#F5F5F5] px-5 pt-4 pb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                </div>
                <div className="p-2 rounded-full bg-orange-50">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accommodation Overview */}
        <h2
          style={{
            color: '#000000',
            fontSize: 20,
            fontWeight: '600',
          }}
          className="mb-4"
        >
          Meine Aufenthalte
        </h2>
        <div className="space-y-4">
          {accommodations.map((acc) => (
            <div key={acc.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {acc.image && (
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-black">{acc.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <FiCalendar className="mr-2 text-[#FF7A00]" />
                      {acc.checkIn} - {acc.checkOut}
                    </div>
                  </div>
                  <button className="text-[#FF7A00] text-sm font-medium">
                    Bearbeiten
                  </button>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-start">
                    <FiMapPin className="text-[#FF7A00] mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-800">{acc.address}</p>
                      <p className="text-sm text-gray-600">{acc.city}, {acc.country}</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-3 border-2 border-dashed border-[#FF7A00] rounded-lg text-[#FF7A00] flex flex-col items-center justify-center gap-1">
                  <span className="text-2xl">+</span>
                  <span className="text-sm font-medium">Neuen Aufenthalt hinzufügen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleAddClick}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF7A00] text-white shadow-lg hover:bg-[#E56D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A00]"
      >
        +
      </button>
    </div>
  );
}

function handleAddClick() {
  console.log('Add button clicked');
  // Add your logic for adding a new accommodation here
}
