import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Orders from "./pages/orders/Orders";

function App() {
  const clientdId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{ clientId: clientdId }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<List />} />
          <Route path="/rooms/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
