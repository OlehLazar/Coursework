import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => (
  <main className="flex flex-col min-h-screen bg-[#fdf5df]">
    <Header />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer />
  </main>
);

export default DefaultLayout;