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

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
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
                <Route path="/checkout" element={<CheckOutPage></CheckOutPage>}></Route>
                <Route path="/success" element={<SuccessPage></SuccessPage>}></Route>
                <Route path="/my-orders" element={<OrdersPage></OrdersPage>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
