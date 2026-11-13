import { Outlet, ScrollRestoration } from "react-router-dom";

import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";

const Main = () => {
  return (
    <div className="min-h-screen bg-theme-cream text-theme-dark font-sans flex flex-col justify-between selection:bg-theme-olive selection:text-theme-cream">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;

