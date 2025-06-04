// src/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-orange-100 dark:bg-neutral-950 text-gray-700 dark:text-gray-300 transition-colors mx-2 mb-2 rounded-xl">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* ░░ TOP GRID ░░ */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-bold tracking-tight text-orange-600 dark:text-orange-500">
              Pathfinder
            </h4>
            <p className="mt-3 text-sm leading-relaxed">
              Learn by building. Discover the roadmap that fits&nbsp;your journey.
            </p>
          </div>

          <FooterColumn title="Navigation">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/articles">Articles</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Categories">
            <FooterLink to="/category/frontend">Front-End</FooterLink>
            <FooterLink to="/category/backend">Back-End</FooterLink>
            <FooterLink to="/category/devops">DevOps</FooterLink>
            <FooterLink to="/category/data">Data&nbsp;Science</FooterLink>
          </FooterColumn>

          <FooterColumn title="Follow Us">
            <FooterExt href="#">Twitter</FooterExt>
            <FooterExt href="#">LinkedIn</FooterExt>
            <FooterExt href="#">GitHub</FooterExt>
            <FooterExt href="#">Newsletter</FooterExt>
          </FooterColumn>
        </div>

        {/* ░░ BOTTOM STRIP ░░ */}
        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm">
          © {year} Pathfinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ————— Helper Components ————— */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h5 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
        {title}
      </h5>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterExt({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
      >
        {children}
      </a>
    </li>
  );
}
