// import TopNavBar from "./components/topNavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./components/navBar";
// import SideBar from "./components/sideBar";
// import Products from "./components/products";
import BottomNavBar from "./components/bottomNavBar";
import TopNavBar from "./components/topNavBar";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductDetail from "./pages/productDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNavBar />
        <div className="md:px-12 px-4 pt-7 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        </div>
        <BottomNavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
