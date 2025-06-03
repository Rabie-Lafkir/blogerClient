import { NavLink } from 'react-router-dom';
import { type ReactNode, useRef, useEffect } from 'react';

/**
 * Config‑driven navbar that mimics the clean look of the “Horizone” Dribbble shot.
 * – Transparent by default, picks up a blurred white background + subtle shadow once the hero scrolls off‑screen.
 * – Uses **Tailwind’s built‑in orange scale** for brand colour (no custom palette).
 */
export type NavItem = {
  label: string;
  to: string;
  icon?: ReactNode;
};

export interface NavbarProps {
  items: NavItem[];
  /** Optional brand element shown at left */
  brand?: ReactNode;
}

export default function Navbar({ items, brand }: NavbarProps) {
  /** ref used to toggle blur / background when page scrolls */
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle(
          'backdrop-blur bg-white/60 dark:bg-neutral-900/60 shadow-sm',
          !entry.isIntersecting,
        );
      },
      { rootMargin: '-64px 0px 0px 0px' }, // trigger when hero (≈64px) leaves viewport
    );

    obs.observe(document.body);
    return () => obs.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 flex h-16 items-center transition-colors duration-300"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        {/* Brand / Logo */}
        {brand ?? (
          <NavLink
            to="/"
            className="font-heading text-xl font-bold tracking-tight text-orange-500"
          >
            Pathfinder
          </NavLink>
        )}

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex">
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
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Placeholder for future mobile menu button */}
        <button className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-orange-600">
          <span className="sr-only">Open menu</span>
          {/* simple hamburger */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
