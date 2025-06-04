import { NavLink, useNavigate } from 'react-router-dom';
import {
  type ReactNode,
  useRef,
  useEffect,
  useState,
} from 'react';
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
  const navigate = useNavigate();

  /* ----- blur on scroll (unchanged) ----- */
  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;

    const obs = new IntersectionObserver(
      ([entry]) =>
        nav.classList.toggle(
          'backdrop-blur bg-white/60 dark:bg-neutral-900/60 shadow-sm',
          !entry.isIntersecting
        ),
      { rootMargin: '-64px 0px 0px 0px' }
    );

    obs.observe(document.body);
    return () => obs.disconnect();
  }, []);

  /* ----- logout helper ----- */
  const handleLogout = () => {
    logout();
    setUser(null);
    setOpen(false);
    navigate('/');
  };

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 flex h-16 items-center transition-colors duration-300"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        {brand ?? (
          <NavLink to="/" className="font-heading text-xl font-bold tracking-tight text-orange-500">
            Pathfinder
          </NavLink>
        )}

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {items.map(({ label, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'inline-flex items-center gap-1 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-600 dark:text-gray-200',
                ].join(' ')
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side auth area */}
        {user ? (
          /* ----- Logged-in avatar + dropdown ----- */
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="h-9 w-9 rounded-full bg-orange-500 text-white flex items-center justify-center select-none"
            >
              {/* {user.username.charAt(0).toUpperCase()} */}user
            </button>

            {open && (
              <div
                onMouseLeave={() => setOpen(false)}
                className="absolute right-0 mt-2 w-40 rounded-md bg-white dark:bg-neutral-800 shadow-lg py-1 text-sm"
              >
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-neutral-700"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-neutral-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ----- Not logged-in: Login & Register buttons ----- */
          <div className="hidden md:flex gap-3">
            <NavLink
              to="/login"
              className="px-4 py-1.5 text-sm font-medium text-orange-600 border border-orange-500 rounded hover:bg-orange-50 dark:hover:bg-neutral-700"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 py-1.5 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Register
            </NavLink>
          </div>
        )}

        {/* Mobile hamburger (unchanged) */}
        <button className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-orange-600">
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            fill="none"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
