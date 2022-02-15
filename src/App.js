import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BottomNavBar from "./components/bottomNavBar";
import TopNavBar from "./components/topNavBar";
import AboutUs from "./pages/AboutUs";
import AddProduct from "./pages/addProduct";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductDetail from "./pages/productDetail";
import { getCurrentUser } from "./services/userService";
import MyProducts from "./pages/myProducts"; 

const UserContext = createContext(undefined);

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <TopNavBar setUser={setUser} />
          <div className="md:px-12 px-4 pt-7 pb-10">
            <Routes>
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/mine" element={<MyProducts />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/" element={<Home />} />
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
