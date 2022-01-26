import TopNavBar from "./components/topNavBar";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import Products from "./components/products";
import BottomNavBar from "./components/bottomNavBar";

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <NavBar />
      <SideBar />
      <Products />
      <BottomNavBar />
    </div>
  );
}

export default App;
