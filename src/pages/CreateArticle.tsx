import { useEffect, useState, useCallback, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import {jwtDecode} from 'jwt-decode';
import api from '../api/axios';
import { createArticle } from '../api/articleService';

type Category = { _id: string; name: string };
type DecodedToken = { id: string; username: string; email: string };

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get<Category[]>('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) setCover(files[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop,
  });

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };
  const onTagKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const publish = async () => {
    setErr(null);

    const missing: string[] = [];
    if (!title.trim()) missing.push('title');
    if (!content.trim()) missing.push('content');
    if (!cover) missing.push('cover image');
    if (!category) missing.push('category');

    if (missing.length) {
      setErr(
        'Please provide ' +
          missing.map((m) => m[0].toUpperCase() + m.slice(1)).join(', ').replace(/, ([^,]*)$/, ' and $1') +
          '.'
      );
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      const userId = token ? jwtDecode<DecodedToken>(token).id : null;

      const fd = new FormData();
      fd.append('title', title);
      fd.append('content', content);
      fd.append('category', category);
      tags.forEach((t) => fd.append('tags', t));
      fd.append('image', cover);
      if (userId) fd.append('author', userId); // only if backend requires it explicitly

      const res = await createArticle(fd);
      navigate(`/article/${res.data.slug}`);
    } catch (e: any) {
      setErr(e.response?.data?.error || 'Failed to publish');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400">New Article</h1>

      {err && (
        <p className="p-3 bg-red-100 dark:bg-red-200 text-red-700 rounded">
          {err}
        </p>
      )}

      <div className="space-y-6">
        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Amazing article title…"
          className={classNames(
            'w-full text-xl font-semibold bg-transparent border-b pb-2 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white',
            !title.trim() && err ? 'border-red-500' : 'border-orange-300 focus:border-orange-500'
          )}
        />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          {categories.length > 0 ? categories.map((c) => (
            <label
              key={c._id}
              className={classNames(
                'cursor-pointer px-3 py-1 rounded-full border text-sm transition-colors',
                category === c._id
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'border-orange-300 text-gray-700 dark:text-gray-300',
                !category && err && 'border-red-500'
              )}
            >
              <input
                type="radio"
                hidden
                value={c._id}
                checked={category === c._id}
                onChange={() => setCategory(c._id)}
              />
              {c.name}
            </label>
          )) : (
            <p className="text-gray-600 dark:text-gray-400">Loading categories…</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKey}
            placeholder="Add a tag and press Enter"
            className="w-full border border-orange-200 dark:border-orange-300 rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 text-xs px-3 py-1 rounded-full flex items-center gap-1"
              >
                #{t}
                <button
                  onClick={() => setTags(tags.filter((x) => x !== t))}
                  className="ml-1 hover:text-orange-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div
          {...getRootProps()}
          className={classNames(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition',
            isDragActive
              ? 'border-orange-500 bg-orange-50 dark:bg-neutral-700'
              : !cover && err
              ? 'border-red-500'
              : 'border-orange-300'
          )}
        >
          <input {...getInputProps()} />
          {cover ? (
            <img
              src={URL.createObjectURL(cover)}
              alt="cover preview"
              className="mx-auto h-48 object-cover rounded"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500">
              Drag & drop cover image here, or click to select
            </p>
          )}
        </div>

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write Markdown here…"
          rows={12}
          className={classNames(
            'w-full border rounded p-3 resize-y placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white',
            !content.trim() && err ? 'border-red-500' : 'border-orange-200 dark:border-orange-300'
          )}
        />
      </div>

      {/* Publish Button */}
      <div className="sticky bottom-0 bg-white/70 dark:bg-neutral-900/70 backdrop-blur py-4 flex justify-end">
        <button
          disabled={loading}
          onClick={publish}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Publishing…' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
