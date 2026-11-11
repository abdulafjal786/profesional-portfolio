import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer_Home";
import Loader from "./components/Loader";
import ParticleField from "./three/ParticleField";
import { initLenis, scrollToTop } from "./components/lenis";

const Home = lazy(() => import("./components/About"));
const AboutPage = lazy(() => import("./components/Home1"));
const Books = lazy(() => import("./components/Books"));
const Movies = lazy(() => import("./components/Movies"));
const Contact = lazy(() => import("./components/Contat"));
const Gallery = lazy(() => import("./components/Gallery"));
const Sessions = lazy(() => import("./components/Sessions"));
const SessionGallery = lazy(() => import("./components/Session_Gallery"));
const Login = lazy(() => import("./components/admin/Login"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));

const EASE = [0.76, 0, 0.24, 1];

/** Curtain wipe + fade between routes. */
function Page({ children }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease: EASE } }}
        exit={{ scaleY: 0 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[61] bg-ink"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.5, ease: EASE } }}
        style={{ transformOrigin: "bottom" }}
      />
    </>
  );
}

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-ember" />
    </div>
  );
}

function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(() => {
    try {
      return !sessionStorage.getItem("ap-intro");
    } catch {
      return true;
    }
  });
  const isAdmin = location.pathname.toLowerCase().startsWith("/admin");

  useEffect(() => {
    if (!showLoader) return;
    const t = setTimeout(() => {
      setShowLoader(false);
      try {
        sessionStorage.setItem("ap-intro", "1");
      } catch {
        /* storage unavailable */
      }
    }, 2600);
    return () => clearTimeout(t);
  }, [showLoader]);

  useEffect(() => {
    initLenis();
  }, []);

  if (isAdmin) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<div className="min-h-screen bg-gray-50 text-gray-900">{<Dashboard />}</div>} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <ParticleField />
      <AnimatePresence>{showLoader && <Loader key="loader" />}</AnimatePresence>
      {!showLoader && (
        <>
          <Header />
          <main>
            <AnimatePresence mode="wait" onExitComplete={() => scrollToTop(true)}>
              <Suspense fallback={<PageFallback />} key={location.pathname}>
                <Routes location={location}>
                  <Route path="/" element={<Page><Home /></Page>} />
                  <Route path="/about" element={<Page><AboutPage /></Page>} />
                  <Route path="/book" element={<Page><Books /></Page>} />
                  <Route path="/movies" element={<Page><Movies /></Page>} />
                  <Route path="/contact" element={<Page><Contact /></Page>} />
                  <Route path="/gallery" element={<Page><Gallery /></Page>} />
                  <Route path="/sessions" element={<Page><Sessions /></Page>} />
                  <Route path="/Session-Gallery/:albumId" element={<Page><SessionGallery /></Page>} />
                  <Route path="*" element={<Page><NotFound /></Page>} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

function NotFound() {
  return (
    <section className="container-x grid min-h-[80vh] place-items-center pt-28 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-6 font-display text-6xl font-light">This scene isn&rsquo;t in the script.</h1>
        <a href="/" className="btn-primary mt-10">Back home</a>
      </div>
    </section>
  );
}

export default App;
