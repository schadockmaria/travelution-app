'use client';

// Image component removed as we're using regular img tags
import { FiSettings, FiBell, FiGlobe, FiMoon, FiHeart, FiMapPin, FiPlus } from 'react-icons/fi';
import 'country-flag-icons/3x2/flags.css';

const stats = [
  { id: 1, label: 'Bereiste Länder', value: '12' },
  { id: 2, label: 'Gesamte Reisetage', value: '187' },
  { id: 3, label: 'Aktive Trips', value: '2' },
];

const settings = [
  { id: 1, icon: <FiBell className="w-5 h-5" />, label: 'Benachrichtigungen', value: 'Aktiviert' },
  { id: 2, icon: <FiGlobe className="w-5 h-5" />, label: 'Sprache', value: 'Deutsch' },
  { id: 3, icon: <FiMoon className="w-5 h-5" />, label: 'Dark Mode', value: 'Aus' },
  { id: 4, icon: <FiSettings className="w-5 h-5" />, label: 'Allgemeine Einstellungen', value: '' },
];

// Map of country names to ISO country codes for flags
const countryFlags: { [key: string]: string } = {
  'Japan': 'jp',
  'Neuseeland': 'nz',
  'Island': 'is',
  'Peru': 'pe',
  'Südafrika': 'za',
  'Bali': 'id',
  'Italien': 'it',
  'Spanien': 'es',
  'Frankreich': 'fr',
  'USA': 'us',
  'Kanada': 'ca',
  'Brasilien': 'br',
  'Australien': 'au',
  'Thailand': 'th',
  'Vietnam': 'vn'
};

const wishlist = [
  { id: 1, name: 'Japan' },
  { id: 2, name: 'Neuseeland' },
  { id: 3, name: 'Island' },
  { id: 4, name: 'Peru' },
  { id: 5, name: 'Südafrika' },
];

export default function ProfilePage() {
  return (
    <div className="pb-24">
      {/* Profil Header */}
      <div className="bg-[#FF7A00] text-white p-6 rounded-b-3xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden border-4 border-white relative z-20">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Profilbild"
              className="w-full h-full object-cover"
              width="96"
              height="96"
              loading="lazy"
            />
          </div>
          <h1 className="text-2xl font-extrabold mb-1 relative z-20 text-black">Sarah Müller</h1>
          <p className="text-white/90 text-sm font-medium relative z-20">Abenteuer suchend</p>
        </div>
      </div>

      {/* Statistiken */}
      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Meine Reise-Statistiken</h2>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Lieblingskontinent</span>
              <span className="text-sm font-medium">Europa</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#FF7A00] h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Einstellungen */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Einstellungen</h2>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <ul className="divide-y divide-gray-100">
            {settings.map((item) => (
              <li key={item.id} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-[#FF7A00] mr-3">{item.icon}</span>
                    <span className="text-gray-800">{item.label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 text-sm mr-2">{item.value}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wunschliste */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Meine Wunschziele</h2>
          <button className="text-[#FF7A00] text-sm font-medium">Alle anzeigen</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {wishlist.map((item) => {
            const countryCode = countryFlags[item.name]?.toLowerCase() || 'xx';
            return (
              <div key={item.id} className="bg-white px-3 py-2 rounded-full border border-gray-200 flex items-center">
                <div 
                  className="w-5 h-5 rounded-full overflow-hidden mr-2 flex-shrink-0"
                  style={{
                    backgroundImage: `url(https://flagcdn.com/24x18/${countryCode}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                  title={item.name}
                />
                <span className="text-sm text-black">{item.name}</span>
              </div>
            );
          })}
          <button className="bg-orange-50 text-[#FF7A00] w-10 h-10 rounded-full flex items-center justify-center hover:bg-orange-100 transition-colors">
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Letzte Aktivitäten */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Meine letzten Aktivitäten</h2>
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="bg-orange-50 p-2 rounded-lg text-[#FF7A00] mr-3">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Neuer Trip hinzugefügt</p>
                  <p className="text-xs text-black">Bali, Indonesien • Vor 3 Tagen</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
