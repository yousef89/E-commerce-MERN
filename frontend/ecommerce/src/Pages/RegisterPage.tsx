import { useState } from "react";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister() {
    try {
      const response = await fetch("http://localhost:3001/user/register", {
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
        setErrorMessage(data);
        return;
      }
      setErrorMessage("");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong while registering!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
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
        {errorMessage && <h1 className="text-red-500 mt-2">{errorMessage}</h1>}
      </div>
    </div>
  );
}
