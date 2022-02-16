import { createContext, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import BottomNavBar from "./components/bottomNavBar";
import TopNavBar from "./components/topNavBar";
import AboutUs from "./pages/AboutUs";
import AddProduct from "./pages/addProduct";
import Home from "./pages/Home";
import MyProducts from "./pages/myProducts";
import NotFound from "./pages/notFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductDetail from "./pages/productDetail";
import { getCurrentUser } from "./services/userService";

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(getCurrentUser());

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <TopNavBar setUser={setUser} />
          <div className="md:px-8 px-1 mt-7 mb-10">
            <Routes>
              <Route path="about-us" exact element={<AboutUs />} />
              <Route path="privacy-policy" exact element={<PrivacyPolicy />} />

              <Route path="products" element={<Outlet />} >
                <Route path=":id" element={<ProductDetail />} />
                <Route path="mine" element={<MyProducts />} />
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
