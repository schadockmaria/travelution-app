// Image component removed as we're using regular img tags
import { FiMapPin, FiArrowRight } from 'react-icons/fi';

const destinations = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Griechenland',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80',
    description: 'Weiße Häuser mit blauen Kuppeln vor der Ägäis - ein Postkartenmotiv zum Verlieben.',
    tags: ['Strand', 'Romantik', 'Luxus']
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800&q=80',
    description: 'Tradition trifft Moderne in dieser kulturellen Schatzkammer Japans mit ihren Tempeln und Gärten.',
    tags: ['Kultur', 'Stadt', 'Natur']
  },
  {
    id: 3,
    name: 'Patagonien',
    country: 'Chile/Argentinien',
    image: 'https://images.unsplash.com/photo-1559599238-308793637427?auto=format&fit=crop&w=800&q=80',
    description: 'Ungestüme Natur, Gletscher und atemberaubende Berglandschaften für Abenteurer.',
    tags: ['Natur', 'Abenteuer', 'Wandern']
  },
  {
    id: 4,
    name: 'Marrakesch',
    country: 'Marokko',
    image: 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?auto=format&fit=crop&w=800&q=80',
    description: 'Ein Fest für die Sinne mit bunten Märkten, exotischen Düften und orientalischer Architektur.',
    tags: ['Kultur', 'Stadt', 'Kulinarik']
  },
  {
    id: 5,
    name: 'Neuseeland',
    country: 'Südinsel',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
    description: 'Dramatische Landschaften, die von Gletschern bis zu Regenwäldern reichen.',
    tags: ['Natur', 'Abenteuer', 'Wandern']
  },
  {
    id: 6,
    name: 'Venedig',
    country: 'Italien',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80',
    description: 'Die romantische Stadt auf dem Wasser mit ihren Kanälen und historischen Palästen.',
    tags: ['Romantik', 'Kultur', 'Stadt']
  },
];

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Entdecke die Welt</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Finde dein nächstes Reiseziel und lass dich von unseren Top-Destinationen inspirieren</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {destinations.map((destination) => (
          <div key={destination.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col h-full">
            <div className="relative h-56 overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <div className="flex items-center text-sm mb-1">
                    <FiMapPin className="mr-1" />
                    <span>{destination.country}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h2>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{destination.description}</p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-orange-50/80 text-orange-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 text-orange-600 hover:text-white bg-orange-50 hover:bg-orange-600 font-medium py-2.5 px-4 rounded-lg transition-all duration-300 group-hover:shadow-md">
                  <span>Mehr erfahren</span>
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
