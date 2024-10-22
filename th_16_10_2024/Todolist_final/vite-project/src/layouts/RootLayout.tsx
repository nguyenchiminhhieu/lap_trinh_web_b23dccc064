import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "sonner";
const RootLayout = () => {
  return (
    <div className="bg-base w-full min-h-screen">
      <header>
        <NavBar />
      </header>
      <main className="mt-6">
        <Outlet />
        <Toaster position="top-center"/>
      </main>
    </div>
  );
};

export default RootLayout;
