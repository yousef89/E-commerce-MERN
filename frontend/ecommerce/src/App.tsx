import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./components/NavBar";
import RegisterPage from "./Pages/RegisterPage";
import Login from "./Pages/LoginPage";
import AuthProvider from "./context/userContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/register" element={<RegisterPage></RegisterPage>} />
            <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
