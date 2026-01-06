import { ReactNode } from 'react';
import Link from 'next/link';
import { FiHome, FiNavigation, FiLayers, FiMap, FiUser } from 'react-icons/fi';

type NavItem = {
  id: number;
  name: string;
  icon: ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  { id: 1, name: 'Home', icon: <FiHome />, href: '/' },
  { id: 2, name: 'Trips', icon: <FiNavigation />, href: '/trips' },
  { id: 3, name: 'Planen', icon: <FiLayers />, href: '/planen' },
  { id: 4, name: 'Erkunden', icon: <FiMap />, href: '/explore' },
  { id: 5, name: 'Profil', icon: <FiUser />, href: '/profile' },
];

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gray-50 pb-20">
      {children}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-4">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-900 transition-colors"
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
