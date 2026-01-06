'use client';

import { FiHome, FiMap, FiList, FiCompass, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: FiHome, label: 'Home', href: '/' },
    { icon: FiMap, label: 'Trips', href: '/trips' },
    { icon: FiList, label: 'Planen', href: '/planen' },
    { icon: FiCompass, label: 'Erkunden', href: '/explore' },
    { icon: FiUser, label: 'Profil', href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-lg z-50 flex justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex justify-between items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 flex-1 ${
                isActive 
                  ? 'text-white bg-[#FF7A00] -translate-y-1' 
                  : 'text-gray-500 hover:text-[#FF7A00] hover:bg-orange-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
