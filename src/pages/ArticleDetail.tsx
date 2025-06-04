import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, type Article } from '../api/articleService';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* fetch article on mount */
  useEffect(() => {
    if (!slug) return;
    getArticle(slug)
      .then((r) => setArticle(r.data))
      .catch((err) => setError(err.response?.data?.error || 'Not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ------------- states ------------- */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading…</p>
      </div>
    );

  if (error || !article)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-red-600">{error ?? 'Article not found'}</p>
        <Link to="/" className="mt-4 text-orange-600 hover:underline">
          Back to home
        </Link>
      </div>
    );

  /* ------------- UI ------------- */
  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Cover image */}
      <img
        src={`http://localhost:5000/uploads/${article.coverImage}`}
        alt={article.title}
        className="w-full h-72 object-cover rounded-lg shadow mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        {article.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-orange-500 text-white">
          {article.author.username.charAt(0).toUpperCase()}
        </div>
        <span>{article.author.username}</span>
        <span>·</span>
        <time>{new Date(article.createdAt).toLocaleDateString()}</time>
        {article.category && (
          <>
            <span>·</span>
            <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200 text-xs">
              {article.category.name}
            </span>
          </>
        )}
      </div>

      {/* Placeholder when no body is returned */}
      {article?.content ? <div className="text-lg text-gray-700 dark:text-gray-300">
        <p>{article?.content}</p>
      </div> : <div className="text-lg text-gray-700 dark:text-gray-300">
        <p>This article does not contain body content.</p>
      </div> }
    </article>
  );
}
