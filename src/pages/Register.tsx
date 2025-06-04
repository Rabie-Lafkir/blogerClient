import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authService';
import { useAuth } from '../hooks/useAuth';

type Form = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const RegisterPage = () => {
  const [form, setForm] = useState<Form>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  /* ------- helpers ------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.firstName.trim()) err.firstName = 'Required';
    if (!form.username.trim()) err.username = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Invalid email';
    if (form.password.length < 6) err.password = 'Min 6 chars';
    if (form.password !== form.confirmPassword)
      err.confirmPassword = 'Mismatch';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      const user = await register({
        username: form.username,
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      });
      setUser(user as any);
      navigate('/');
    } catch (err: any) {
      setErrors({ general: err.response?.data?.error || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  /* --------- UI (unchanged styles) --------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-neutral-900 px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-6 text-center">
          Create your account
        </h1>

        {errors.general && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 dark:bg-red-200 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First + Last Name */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-orange-200 dark:border-orange-300 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-orange-200 dark:border-orange-300 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-orange-200 dark:border-orange-300 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-orange-200 dark:border-orange-300 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Phone Number (optional)
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+212 6 XX XX XX XX"
              className="w-full px-4 py-2 rounded-md border border-orange-200 dark:border-orange-300 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-orange-200 dark:border-orange-300 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-orange-200 dark:border-orange-300 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-md transition disabled:opacity-50"
          >
            {isLoading ? 'Creating account…' : 'Register'}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-600 dark:text-orange-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
