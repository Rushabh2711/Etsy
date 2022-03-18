import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './components/Navbar';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getProducts, getFavorite, removeFavorite, addFavotite} from './services/ProductService';
import Home from './pages/Home';
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import Shop from "./pages/Shop";
import EditProfile from "./pages/EditProfile";
import MyOrder from "./pages/MyOrder";
import Item from "./pages/Item";
import { signin, product } from './actions';

function App() {


  const LoggedInUSer = useSelector(state => state.LoggedInUSer);
  const products = useSelector(state => state.Products);
  const User = useSelector(state => state.User);
  const dispatch = useDispatch();

  var fav = []
  useEffect( async () => {
    try{
        const data = await getProducts();
        fav = LoggedInUSer ? await getFavorite(LoggedInUSer) : [];
    
        data.forEach(p => {
            fav.forEach(f => {
                if(p.product_id === f.product_id) {
                    p.isFav = true;
                }
            })
        });
    
        // setproducts(data);
        dispatch(product(data));
    }
    catch(error){
        console.log(error)
    }
    
  },[LoggedInUSer]);


  const handleIconclick = async (p) => {
    try {
        if(p.isFav) {
            await removeFavorite(p, LoggedInUSer);
            products.forEach(i => {
                if(i.product_id === p.product_id) {
                    i.isFav = false;
                }
            })
            // setproducts([...products]);
        }
        else {
            await addFavotite(p, LoggedInUSer);

            products.forEach(i => {
                if(i.product_id === p.product_id) {
                    i.isFav = true;
                }
            });
            // setproducts([...products]);
        }
        dispatch(product([...products]));
    } catch (error) {
        
    }
}


  return (
    <div className="App">
      {/* <Navbar/>
        <ProductItem/> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home handleIconclick={handleIconclick}/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorite" element={<Favorite handleIconclick={handleIconclick}/>} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:shopId" element={<Shop />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/myorder" element={<MyOrder />} />
              <Route path="/item/:itemId" element={<Item handleIconclick={handleIconclick}/>} />
            </Routes>
          </BrowserRouter>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
