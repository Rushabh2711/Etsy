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
import { signin, product, userLogin } from './actions';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(message);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3001/graphql" }),
]);

const client = new ApolloClient({ cache: new InMemoryCache(), link });

function App() {


  const LoggedInUSer = useSelector(state => state.LoggedInUSer);
  const products = useSelector(state => state.Products);
  const User = useSelector(state => state.User);
  const dispatch = useDispatch();

  var fav = []
  useEffect( async () => {
    try{
        const data = await getProducts();
        fav = LoggedInUSer ? User.favorite : [];
    
        data.forEach(p => {
            fav.forEach(f => {
                if(p._id === f) {
                    p.isFav = true;
                }
            })
        });
    
        // setproducts(data);
        dispatch(product(data));
    }
    catch(error){
        console.log(error);
    }
    
  },[LoggedInUSer, User]);


  const handleIconclick = async (p) => {
    try {
        if(p.isFav) {
            await removeFavorite(p, LoggedInUSer);
            products.forEach(i => {
                if(i._id === p._id) {
                    i.isFav = false;
                    User.favorite = User.favorite.filter(f => f !== p._id);
                }
            })
            // setproducts([...products]);
        }
        else {
            await addFavotite(p, LoggedInUSer);

            products.forEach(i => {
                if(i._id === p._id) {
                    i.isFav = true;
                    User.favorite.push(p._id);
                }
            });
            // setproducts([...products]);
        }
        dispatch(product([...products]));
        dispatch(userLogin([...User]));
    } catch (error) {
        
    }
}


  return (
    <div className="App">
      {/* <Navbar/>
        <ProductItem/> */}
        <ApolloProvider client={client}>
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
          </ApolloProvider>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
