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
    <div className="w-full bg-blue-500 flex shadow-xl items-center mb-10">
      <div
        onClick={handleHome}
        className="flex items-center ml-4 py-6 gap-x-2 cursor-pointer"
      >
        <NavBarIcon className="size-6" />
        <div className="text-[15px] font-orbitron tracking-widest text-white font-extrabold text-nowrap tablet:text-[19px]">
          Tech Hub
        </div>
      </div>
      {token ? (
        <div className="flex ml-auto gap-x-3 items-center justify-center">
          <h1 className="font-josefin text-white">Welcome<span className="hidden PC:inline tablet:inline">, {firstName}</span></h1>
          <ShoppingCartIcon
            onClick={handleCart}
            className="size-7 cursor-pointer text-white hover:text-slate-300 transition"
          />
          <div className="flex flex-col ml-auto w-[90px] gap-y-1 mr-2 tablet:flex-row tablet:w-[150px] tablet:gap-x-2">
            <button
              onClick={handleOrders}
              className="w-full bg-white text-[12px] px-1 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg font-josefin font-semibold"
            >
              My orders
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-white text-[12px] px-1 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg font-josefin font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-white ml-auto mr-7 px-4 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg font-josefin font-semibold"
        >
          Login
        </button>
      )}
    </div>
  );
}
