import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./components/NavBar";
import RegisterPage from "./Pages/RegisterPage";
import Login from "./Pages/LoginPage";
import AuthProvider from "./context/authContext";
import CartPage from "./Pages/CartPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CartProvider from "./context/cartContext";
import CheckOutPage from "./Pages/CheckoutPage";
import SuccessPage from "./Pages/SuccessPage";
import OrdersPage from "./Pages/OrdersPage";
import LoadingWrapper from "./components/LoadingWrapper";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <LoadingWrapper>
          <NavBar />
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<HomePage />} />
              </Route>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/my-orders" element={<OrdersPage />} />
              </Route>
            </Routes>
          </LoadingWrapper>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;