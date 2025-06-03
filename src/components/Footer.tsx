import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 className="text-xl font-semibold text-white">CodePath</h4>
            <p className="mt-2 text-sm text-gray-400">
              Learn by building. Find the roadmap that fits your journey.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-3">Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/articles" className="hover:text-white">Articles</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-3">Categories</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/frontend" className="hover:text-white">Front-End</Link></li>
              <li><Link to="/category/backend" className="hover:text-white">Back-End</Link></li>
              <li><Link to="/category/devops" className="hover:text-white">DevOps</Link></li>
              <li><Link to="/category/data" className="hover:text-white">Data Science</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">GitHub</a></li>
              <li><a href="#" className="hover:text-white">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CodePath. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}