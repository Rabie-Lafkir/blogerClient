import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import heroImg from '../assets/success.jpg';
/* ------------------------------------------------------------------
 * Home page layout inspired by the “Horizone – Blog Page” shot.
 * - Full‑width hero banner with search.
 * - Horizontal category pills.
 * - 3‑column article grid.
 *
 * Tailwind colors: default orange scale (orange‑50 / 200 / 400 / 500 / 600).
 * Replace dummy data & hero image with API calls later.
 * ------------------------------------------------------------------*/

/** Dummy category list – fetch from API in real app */
const CATEGORIES = [
  'All',
  'Front‑End',
  'Back‑End',
  'Data Science',
  'DevOps',
  'UX/UI',
];

/** Dummy article sample – shape should match your Express API */
const ARTICLES = Array.from({ length: 9 }).map((_, i) => ({
  slug: `sample-article-${i + 1}`,
  title: `Sample Article ${i + 1}: Crafting an Engaging Blog Layout`,
  category: CATEGORIES[(i % (CATEGORIES.length - 1)) + 1],
  author: 'John Doe',
  date: 'Jun 3, 2025',
}));

// ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeCat, setActiveCat] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = ARTICLES.filter((a) => {
    const catOk = activeCat === 'All' || a.category === activeCat;
    const qOk = a.title.toLowerCase().includes(query.toLowerCase());
    return catOk && qOk;
  });

  return (
    <>
      <HeroBanner onSearch={setQuery} />

      {/* Category pills */}
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <CategoryTabs
          categories={CATEGORIES}
          active={activeCat}
          onChange={setActiveCat}
        />
      </section>

      {/* Article grid */}
      <section className="mx-auto w-full max-w-7xl grid grid-cols-1 gap-8 px-4 pb-12 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((art) => (
          <ArticleCard key={art.slug} {...art} />
        ))}
      </section>
    </>
  );
}

// ─── Hero banner ───────────────────────────────────────────────────
interface HeroProps {
  onSearch?(q: string): void;
}
function HeroBanner({ onSearch }: HeroProps) {
  return (
    <section
      className="relative flex h-[420px] items-center justify-center bg-cover bg-center lg:h-[620px] mx-2 rounded-xl mt-2"
      style={{
        backgroundImage:
          `url(${heroImg})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />

      <div className="relative z-10 flex flex-col items-center justify-center mb-0 text-center text-white">
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Chart Your Career Change Journey
        </h1>
        <p className="mt-2 opacity-90">
          Real stories from those who successfully pivoted – learn from their wins, mistakes, and lightbulb moments.
        </p>

        {/* search */}
        {onSearch && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              onSearch(form.q.value as string);
            }}
            className="mt-6 flex max-w-md w-full overflow-hidden rounded-md"
          >
            <input
              name="q"
              type="search"
              placeholder="Search articles…"
              className="flex-1 bg-white/90 px-4 py-2 text-sm text-neutral-800 placeholder:italic focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-orange-500 px-4 text-white hover:bg-orange-600"
            >
              <Search size={18} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Category Tabs ─────────────────────────────────────────────────
interface CatProps {
  categories: string[];
  active: string;
  onChange(cat: string): void;
}
function CategoryTabs({ categories, active, onChange }: CatProps) {
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={
            cat === active
              ? 'whitespace-nowrap rounded-full bg-orange-500 px-5 py-1.5 text-sm font-medium text-white'
              : 'whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-5 py-1.5 text-sm font-medium text-orange-600 hover:bg-orange-100'
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Article Card ──────────────────────────────────────────────────
interface CardProps {
  slug: string;
  title: string;
  img: string;
  category: string;
  author: string;
  date: string;
}
function ArticleCard({ slug, title, img, category, author, date }: CardProps) {
  return (
    <Link
      to={`/article/${slug}`}
      className="group relative overflow-hidden rounded-2xl shadow transition-transform hover:translate-y-[-4px] hover:shadow-lg"
    >
      <img src={img} alt="" className="h-64 w-full object-cover transition-transform group-hover:scale-[1.03]" />

      {/* category pill */}
      <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-orange-600">
        {category}
      </span>

      {/* bottom overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-lg font-semibold text-white group-hover:underline">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-200">
          {author} · {date}
        </p>
      </div>
    </Link>
  );
}
