import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "sonner";
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleRegister() {
    try {
      if (!firstName || !lastName || !email || !password) {
        toast.error("please complete missing fields", {className:"bg-red-500 text-white border border-red-600"});
        return;
      }
      const response = await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        toast.error(data, {className:"bg-red-500 text-white border border-red-600"});
        return;
      }
      const data = await response.json();
      login(email, data);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while registering", {className:"bg-red-500 text-white border border-red-600"});
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-[8%]">
      <h1 className="text-[40px]">Register new user</h1>
      <div className="flex flex-col items-center justify-center mt-9 w-[200px] gap-y-1">
        <label className="text-[20px]">First Name </label>
        <input
          className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="text-[20px]">Last Name </label>
        <input
          className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="text-[20px]">Email </label>
        <input
          className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-[20px]">Password </label>
        <input
          className="w-full text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-[100px] bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 active:bg-blue-800 transition mt-3"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
