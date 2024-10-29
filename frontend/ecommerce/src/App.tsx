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
import { Toaster } from "sonner";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/gaming-computer-device-seamless-pattern_1284-51634.jpg?t=st=1730193670~exp=1730197270~hmac=8ecaca161c863870a954520bbabfe86dd0532715f8b42438a32c9317c37468c8&w=1380')] bg-[size:500px] bg-repeat opacity-15 filter grayscale blur-[2px]"></div>
      <div className="relative z-10">
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <LoadingWrapper>
                <NavBar />
                <Toaster/>
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
      </div>
    </div>
  );
}

export default App;