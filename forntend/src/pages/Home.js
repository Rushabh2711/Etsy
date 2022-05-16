import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box } from '@mui/system';
import {getProducts, getFavorite, removeFavorite, addFavotite} from '../services/ProductService';
import { getUserShopDetails } from '../services/ShopService';
import { handleBreakpoints } from '@mui/system';
import { signin, product } from '../actions';
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/queries";

const Home = (props) => {

    // const [products, setproducts] = useState([]);
    const LoggedInUSer = useSelector(state => state.LoggedInUSer);
    const products = useSelector(state => state.Products);
    const [homeProduct, setHomeProduct] = useState();
    const User = useSelector(state => state.User);
    const [getProduct, { error }] = useQuery(GET_PRODUCT);

    const dispatch = useDispatch();

   useEffect( async () => {
       if(LoggedInUSer) {
        const shopData = await getUserShopDetails(LoggedInUSer);
        if(shopData) {
            console.log("filter data", shopData);
            const data = products.filter((p) => p.shop_id !== shopData._id);
            console.log("DATA",data);
            setHomeProduct(data);
        }
        else {
            setHomeProduct(products);
       }
    }
    else {
        setHomeProduct(products);
    }
   }, [LoggedInUSer, products]);

    


    return( 
        <div>
        <Navbar/>
            <Box mt={2} textAlign='center'>
                <h1>Welcome {User.username && User.username.toUpperCase()} !</h1>
            </Box>
            {homeProduct && <ProductItem products={homeProduct}
            handleIconclick={props.handleIconclick} />}
        <Footer/>
        </div>

    );
}

export default Home;