import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { User, Folder, BookOpen } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { icon: Logo, label: 'Home', to: 'hero' },
  { icon: User, label: 'About', to: 'about' },
  { icon: Folder, label: 'Projects', to: 'projects' },
  { icon: BookOpen, label: 'Blog', to: 'blog' },
];

export const QuickNav = () => {
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          smooth
          duration={700}
          spy
          offset={-80}
          activeClass="!bg-[var(--color-accent)] !text-white !shadow-lg"
          className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white shadow hover:shadow-lg border border-gray-200 text-gray-500 hover:text-gray-900 transition-all"
        >
          <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold bg-white px-3 py-1 rounded-full shadow border text-gray-700 whitespace-nowrap">
            {item.label}
          </span>
          <item.icon size={18} />
        </Link>
      ))}
    </nav>
  );
};

