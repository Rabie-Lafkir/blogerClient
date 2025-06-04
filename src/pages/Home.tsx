import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../api/axios';
import heroImg from '../assets/success.jpg';
import { Helmet } from 'react-helmet-async';

type Category = { _id: string; name: string };
type Article = {
    slug: string;
    title: string;
    coverImage: string;
    category: { name: string };
    author: { username: string };
    createdAt: string;
};

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [activeCat, setActiveCat] = useState<string>('All');
    const [query, setQuery] = useState('');

    useEffect(() => {
        api.get('/categories').then((res) => setCategories(res.data));
        api.get('/blogs').then((res) => setArticles(res.data));
    }, []);

    const filtered = articles.filter((a) => {
        const catOk = activeCat === 'All' || a.category.name === activeCat;
        const qOk = a.title.toLowerCase().includes(query.toLowerCase());
        return catOk && qOk;
    });

    return (
        <>

            <Helmet>
                <title>Pathfinder | Career Change Blog</title>
            </Helmet>
            <HeroBanner onSearch={setQuery} />

            <section className="mx-auto w-full max-w-7xl px-4 py-6">
                <CategoryTabs
                    categories={['All', ...categories.map((c) => c.name)]}
                    active={activeCat}
                    onChange={setActiveCat}
                />
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 pb-12">
                {filtered.length === 0 ? (
                    <div className="text-gray-600 dark:text-gray-400 py-12 text-lg">
                        😕 No articles found matching your search or category.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((a) => (
                            <ArticleCard
                                key={a.slug}
                                slug={a.slug}
                                title={a.title}
                                img={`${import.meta.env.VITE_API_MEDIA}/uploads/${a.coverImage}`}
                                category={a.category.name}
                                author={a.author.username}
                                date={new Date(a.createdAt).toLocaleDateString()}
                            />
                        ))}
                    </div>
                )}
            </section>

        </>
    );
}

// ─── Hero Section ───
function HeroBanner({ onSearch }: { onSearch?(q: string): void }) {
    return (
        <section
            className="relative flex h-[420px] items-center justify-center bg-cover bg-center lg:h-[620px] mx-2 rounded-xl mt-2"
            style={{ backgroundImage: `url(${heroImg})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                    Chart Your Career Change Journey
                </h1>
                <p className="mt-2 opacity-90">
                    Real stories from those who pivoted — learn from wins, mistakes, and lightbulb moments.
                </p>

                {onSearch && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSearch((e.target as HTMLFormElement).q.value);
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

// ─── Category Pills ───
function CategoryTabs({
    categories,
    active,
    onChange,
}: {
    categories: string[];
    active: string;
    onChange(cat: string): void;
}) {
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

// ─── Article Card ───
function ArticleCard({
    slug,
    title,
    img,
    category,
    author,
    date,
}: {
    slug: string;
    title: string;
    img: string;
    category: string;
    author: string;
    date: string;
}) {
    return (
        <Link
            to={`/article/${slug}`}
            className="group relative overflow-hidden rounded-2xl shadow transition-transform hover:translate-y-[-4px] hover:shadow-lg"
        >
            <img src={img} alt="" className="h-64 w-full object-cover transition-transform group-hover:scale-[1.03]" />
            <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-orange-600">
                {category}
            </span>
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-lg font-semibold text-white group-hover:underline">{title}</h3>
                <p className="mt-1 text-sm text-gray-200">
                    {author} · {date}
                </p>
            </div>
        </Link>
    );
}
