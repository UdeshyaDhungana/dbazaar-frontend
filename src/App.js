import { createContext, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import BottomNavBar from "./components/bottomNavBar";
import TopNavBar from "./components/topNavBar";
import AboutUs from "./pages/aboutUs";
import AddProduct from "./pages/addProduct";
import BiddedProducts from "./pages/biddedProducts";
import Home from "./pages/home";
import MyProducts from "./pages/myProducts";
import NotFound from "./pages/notFound";
import PrivacyPolicy from "./pages/privacyPolicy";
import ProductDetail from "./pages/productDetail";
import MyTransfers from "./pages/myTransfers";
import { getCurrentUser } from "./services/userService";

const mandatory = {
  minHeight: '65vh'
}

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(getCurrentUser());

  return (
    <div className="App">
        <UserContext.Provider value={user}>
          <BrowserRouter>
            <TopNavBar setUser={setUser} />
            <div style={mandatory} className="md:px-8 px-2 mt-7 mb-10">
              <Routes>
                <Route path="about-us" exact element={<AboutUs />} />
                <Route path="privacy-policy" exact element={<PrivacyPolicy />} />
                <Route path="products" element={<Outlet />} >
                  <Route path=":id" element={<ProductDetail />} />
                  <Route path="mine" element={<MyProducts />} />
                  <Route path="my-bids" element={<BiddedProducts />} />
                  <Route path="my-transfers" element={<MyTransfers />} />
                  <Route path="add" element={<AddProduct />} />
                </Route>

                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <BottomNavBar />
          </BrowserRouter>
        </UserContext.Provider>
    </div>
  );
}

export { UserContext };
export default App;
