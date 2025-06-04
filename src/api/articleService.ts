import api, { type ApiResponse } from './axios';

export type Article = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  category: { _id: string; name: string };
  author: { _id: string; username: string };
  createdAt: string;
};

export const listArticles = (): ApiResponse<Article[]> => api.get('/blogs');
export const getArticle = (slug: string): ApiResponse<Article> =>
  api.get(`/blogs/${slug}`);

export const createArticle = (fd: FormData): ApiResponse<Article> =>
  api.post('/blogs', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateArticle = (
  slug: string,
  fd: FormData
): ApiResponse<Article> =>
  api.put(`/blogs/${slug}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteArticle = (slug: string): ApiResponse =>
  api.delete(`/blogs/${slug}`);
