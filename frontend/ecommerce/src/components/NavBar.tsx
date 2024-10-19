import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import NavBarIcon from "../SVGs/NavBarIcon";
import ShoppingCartIcon from "../SVGs/ShoppingCartIcon";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  
  interface CustomJwtPayload {
    firstName: string;
  }
  
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        setFirstName(decodedToken.firstName);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setFirstName(null);
      }
    } else {
      setFirstName(null);
    }
  }, [token]);

  console.log("First Name:", firstName);

  function handleLogin() {
    navigate("/login");
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleCart() {
    navigate("/cart");
  }

  function handleHome() {
    navigate("/");
  }

  function handleOrders() {
    navigate("/my-orders");
  }

  return (
    <div className="w-[100%] bg-blue-500 flex shadow-xl items-center mb-10">
      <div onClick={handleHome} className="flex items-center ml-6 py-4 gap-x-4 cursor-pointer">
        <NavBarIcon className="size-10" />
        <div className="text-xl font-mono text-white">Tech Hub</div>
      </div>
      {token ? (
        <div className="flex ml-auto gap-x-5 items-center">
          <h2 className="text-white cursor-default">{firstName}</h2>
          <ShoppingCartIcon
            onClick={handleCart}
            className="size-7 cursor-pointer text-white hover:text-slate-300 transition"
          />
          <button onClick={handleOrders} className="bg-white ml-auto px-4 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg">
            My orders
          </button>
          <button
            onClick={handleLogout}
            className="bg-white ml-auto mr-7 px-4 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-white ml-auto mr-7 px-4 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg"
        >
          Login
        </button>
      )}
    </div>
  );
}