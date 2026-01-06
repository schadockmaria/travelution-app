import { FiCalendar, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';

const trips = [
  {
    id: 1,
    title: 'Bali Abenteuer',
    location: 'Bali, Indonesien',
    date: '15. - 30. Juni 2024',
    days: '15 Tage',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Erkunde die schönsten Strände und Tempel von Bali in diesem zweiwöchigen Abenteuer.',
    status: 'Geplant'
  },
  {
    id: 2,
    title: 'Städtetrip Paris',
    location: 'Paris, Frankreich',
    date: '10. - 15. Mai 2024',
    days: '5 Tage',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    description: 'Romantische Tage in der Stadt der Liebe mit Besichtigung der wichtigsten Sehenswürdigkeiten.',
    status: 'Abgeschlossen'
  },
  {
    id: 3,
    title: 'Wandern in den Alpen',
    location: 'Zermatt, Schweiz',
    date: '20. - 27. August 2024',
    days: '8 Tage',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    description: 'Atemberaubende Wanderungen mit Blick auf das Matterhorn und die umliegenden Gipfel.',
    status: 'Geplant'
  },
];

export default function TripsPage() {
  return (
    <div className="p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meine Trips</h1>
        <p className="text-gray-600">Geplante und vergangene Reisen auf einen Blick</p>
      </div>

      <div className="space-y-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="relative h-48">
              <img 
                src={trip.image} 
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium ${
                trip.status === 'Geplant' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {trip.status}
              </span>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900">{trip.title}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {trip.days}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <FiMapPin className="mr-1.5" />
                {trip.location}
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <FiCalendar className="mr-1.5" />
                {trip.date}
              </div>
              
              <p className="text-gray-700 mb-4">{trip.description}</p>
              
              <button className="w-full flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#E56B00] text-white font-medium py-2 px-4 rounded-2xl transition-colors">
                Details anzeigen
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
