import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';
import { useAuth } from '../hooks/useAuth';

interface FormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  /* ---------------- validation ---------------- */
  const validate = () => {
    const newErr: typeof errors = {};
    if (!formData.email) newErr.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErr.email = 'Invalid email';
    if (!formData.password) newErr.password = 'Password is required';
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  /* ---------------- form submit ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      const user = await login(formData); // 🔗 call API
      setUser(user);                      // save to context
      navigate('/');                      // go home
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Login failed';
      setErrors({ general: msg });
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- input change ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-neutral-900 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-orange-600 dark:text-orange-400">
          Sign in to your account
        </h2>

        {errors.general && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.email ? 'border-red-500' : 'border-orange-200 dark:border-orange-300'
              } bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.password ? 'border-red-500' : 'border-orange-200 dark:border-orange-300'
              } bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-md transition disabled:opacity-50"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
