import { NavLink, useNavigate } from 'react-router-dom';
import { type ReactNode, useRef, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../api/authService';

export type NavItem = {
  label: string;
  to: string;
  icon?: ReactNode;
};

interface NavbarProps {
  items: NavItem[];
  brand?: ReactNode;
}

export default function Navbar({ items, brand }: NavbarProps) {
  const ref = useRef<HTMLElement>(null);
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setOpen(false);
    navigate('/');
  };

  return (
    <header
      ref={ref}
      className={`fixed top-[15px] w-[90%] left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-[15px] ${
        isScrolled
          ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg border border-white/20'
          : 'bg-transparent border border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 w-full items-center justify-between px-6">
        {/* Brand */}
        {brand ?? (
          <NavLink
            to="/"
            className={`font-heading text-2xl font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-orange-500' : 'text-white'
            }`}
          >
            Pathfinder
          </NavLink>
        )}

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {items.map(({ label, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'inline-flex items-center gap-1 text-lg font-medium transition-colors',
                  isActive
                    ? 'text-orange-500'
                    : isScrolled
                      ? 'text-gray-700 hover:text-orange-600 dark:text-gray-200'
                      : 'text-white/90 hover:text-white',
                ].join(' ')
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side auth area */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className={`h-10 w-10 rounded-full flex items-center justify-center select-none transition-colors ${
                isScrolled ? 'bg-orange-500 text-white' : 'bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              user
            </button>

            {open && (
              <div
                onMouseLeave={() => setOpen(false)}
                className="absolute right-0 mt-2 w-44 rounded-md bg-white dark:bg-neutral-800 shadow-lg py-1 text-base border border-gray-100 dark:border-neutral-700"
              >
                <NavLink
                  to="/new"
                  className="block px-5 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-neutral-700"
                  onClick={() => setOpen(false)}
                >
                  Add new article
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-neutral-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            <NavLink
              to="/login"
              className={`px-5 py-2 text-xl font-medium rounded-full transition-colors ${
                isScrolled
                  ? 'text-orange-600 border border-orange-500 hover:bg-orange-50 dark:hover:bg-neutral-700'
                  : 'text-white border border-white/50 hover:bg-white/10'
              }`}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={`px-5 py-2 text-xl font-medium rounded-full transition-colors ${
                isScrolled
                  ? 'text-white bg-orange-500 hover:bg-orange-600'
                  : 'text-orange-600 bg-white hover:bg-white/90'
              }`}
            >
              Register
            </NavLink>
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-white/80'
          }`}
        >
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            fill="none"
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
