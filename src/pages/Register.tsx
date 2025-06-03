import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', form);
    // TODO: Validation and API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-neutral-900 px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mb-6 text-center">
          Create your account
        </h1>

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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-md transition"
          >
            Register
          </button>

          {/* Footer link */}
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
