import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './components/Navbar';
import Home from './pages/Home';
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import Shop from "./pages/Shop";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="App">
      {/* <Navbar/>
        <ProductItem/> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/EditProfile" element={<EditProfile />} />
            </Routes>
          </BrowserRouter>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
