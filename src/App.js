// import TopNavBar from "./components/topNavBar";
import TopNavBar from "./components/topNavBar";
// import NavBar from "./components/navBar";
// import SideBar from "./components/sideBar";
// import Products from "./components/products";
import BottomNavBar from "./components/bottomNavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductInfo from "./pages/productInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNavBar />
        <div className="md:px-12 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/products/:id" element={<ProductInfo />} />
        </Routes>
        </div>
        <BottomNavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
