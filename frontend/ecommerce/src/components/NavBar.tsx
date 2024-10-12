import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import NavBarIcon from "../SVGs/NavBarIcon";

export default function NavBar() {
  const { email, token , logout } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleLogout(){
    logout();
    navigate("/login");
  }
  return (
    <div className="w-[100%] bg-blue-500 flex shadow-xl items-center mb-10">
      <div className="flex items-center ml-6 py-4 gap-x-4">
        <NavBarIcon className="size-10"></NavBarIcon>
        <div className="text-xl font-mono">Tech Hub</div>
      </div>
      {token ? (
        <div className="flex ml-auto gap-x-5 items-center">
          <h2 className="">{email}</h2>
          <button onClick={handleLogout} className="bg-white ml-auto mr-7 px-4 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg">logout</button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-white ml-auto mr-7 px-4 py-1 rounded-lg hover:bg-slate-200 transition shadow-lg"
        >
          login
        </button>
      )}
    </div>
  );
}
