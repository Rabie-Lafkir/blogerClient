import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { LoginPage } from "./pages/Login";
// 📝 Stubs – replace with real pages when ready
import Home from "./pages/Home";
import { RegisterPage } from "./pages/Register";
import ContactPage from "./pages/Contact";
import ArticleDetail from "./pages/ArticleDetail";
import CreateArticle from "./pages/CreateArticle";

/**
 * Top‑level routing for the app.
 *
 * - `/login` renders the standalone Login page (no navbar).
 * - All other routes are wrapped by <Layout/> which includes navbar + footer.
 */
export default function App() {
  return (
    <Routes>
      {/* Public auth route (no layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* All routes that share the navbar/footer go inside Layout */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/new" element={<CreateArticle />} />
      </Route>

      {/* Catch‑all: redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
