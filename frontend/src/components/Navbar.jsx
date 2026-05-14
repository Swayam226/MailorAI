import { useAuth } from "../context/useAuth";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="text-lg font-medium text-gray-800 hidden md:block">
        Welcome back, {user?.username || "User"}
      </div>
      <div className="text-lg font-bold text-primary-600 md:hidden">
        MailGen AI
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
