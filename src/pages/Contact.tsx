import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-300 dark:bg-neutral-800 px-6 pt-[calc(150px_+_2rem)] pb-16 transition-colors">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Contact Text + Info */}
        <div className="space-y-6 text-gray-800 dark:text-gray-100">
          <h1 className="text-4xl font-bold">Let’s get in touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We’d love to hear from you! Send us a message and we’ll get back as soon as possible.
          </p>

          <div className="space-y-4 pt-6">
            <ContactInfo label="Phone" value="+(2) 578-365-379" />
            <ContactInfo label="Email" value="hello@slabs.com" />
            <ContactInfo
              label="Office"
              value="230 Norman Street, New York, QC (USA) H8R 1A1"
              linkText="View on map"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Us</h2>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-200 text-green-800 rounded-md">
              Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Name *"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <InputField
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                label="Subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 text-base transition
                  bg-white dark:bg-neutral-700
                  text-gray-800 dark:text-white
                  ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-orange-300'}
                  focus:ring-orange-500 focus:border-orange-500 outline-none`}
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-md shadow transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Helper Components */
function InputField({ label, name, value, onChange, error, type = 'text' }: any) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-4 py-3 text-base transition
          bg-white dark:bg-neutral-700
          text-gray-800 dark:text-white
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-orange-300'}
          focus:ring-orange-500 focus:border-orange-500 outline-none`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function ContactInfo({ label, value, linkText }: { label: string; value: string; linkText?: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold">{label}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {value}
        {linkText && (
          <Link to="#" className="ml-2 text-orange-600 dark:text-orange-400 hover:underline text-sm">
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
}
