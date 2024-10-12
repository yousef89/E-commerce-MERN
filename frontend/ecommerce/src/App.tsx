import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./components/NavBar";
import RegisterPage from "./Pages/RegisterPage";
import Login from "./Pages/LoginPage";
import AuthProvider from "./context/userContext";
import CartPage from "./Pages/CartPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route element={<ProtectedRoutes></ProtectedRoutes>}>
              <Route path="/" element={<HomePage></HomePage>} />
            </Route>
            <Route path="/register" element={<RegisterPage></RegisterPage>} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route element={<ProtectedRoutes></ProtectedRoutes>}>
              <Route path="/cart" element={<CartPage></CartPage>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
