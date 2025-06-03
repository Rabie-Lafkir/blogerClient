import { Outlet } from "react-router-dom";
import Navbar, { type NavItem } from "./Navbar"; // adjust path if components in sibling folder
import { Home, Mail } from "lucide-react";
import Footer from "./Footer";

/**
 * Main shell for the app.
 * Renders:
 *   1. Navbar (config‑driven)
 *   2. Page content via <Outlet />
 *   3. (Optional) footer slot
 */
export default function Layout() {
  // 🔧 You can later pull this array from a config file or Redux/Context.
  const navItems: NavItem[] = [
    { label: "Home", to: "/", icon: <Home size={16} /> },
    { label: "Contact", to: "/contact", icon: <Mail size={16} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-neutral-950">
      <Navbar items={navItems} />

      {/* Page content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer (optional) */}
      <Footer></Footer>
    </div>
  );
}
