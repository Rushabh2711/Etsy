import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box } from '@mui/system';
import {getProducts, getFavorite, removeFavorite, addFavotite} from '../services/ProductService';
import { handleBreakpoints } from '@mui/system';
import { signin, product } from '../actions';

const Home = (props) => {

    // const [products, setproducts] = useState([]);
    const LoggedInUSer = useSelector(state => state.LoggedInUSer);
    const products = useSelector(state => state.Products);
    const User = useSelector(state => state.User);
    const dispatch = useDispatch();

    var fav = []
    // useEffect( async () => {
    //     try{
    //         const data = await getProducts();
    //         fav = LoggedInUSer ? await getFavorite(LoggedInUSer) : [];
        
    //         data.forEach(p => {
    //             fav.forEach(f => {
    //                 if(p.product_id === f.product_id) {
    //                     p.isFav = true;
    //                 }
    //             })
    //         });
        
    //         // setproducts(data);
    //         dispatch(product(data));
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
        
    // },[LoggedInUSer]);

    // const handleIconclick = async (p) => {
    //     try {

    //         if(p.isFav) {
    //             await removeFavorite(p, LoggedInUSer);
    //             products.forEach(i => {
    //                 if(i.product_id === p.product_id) {
    //                     i.isFav = false;
    //                 }
    //             })
    //             // setproducts([...products]);
    //         }
    //         else {
    //             await addFavotite(p, LoggedInUSer);

    //             products.forEach(i => {
    //                 if(i.product_id === p.product_id) {
    //                     i.isFav = true;
    //                 }
    //             });
    //             // setproducts([...products]);
    //         }
    //         dispatch(product([...products]));
    //     } catch (error) {
            
    //     }
    // }

    


    return( 
        <div>
        <Navbar/>
            <Box mt={2}>
                <h1 style={{"text-align": "center"}}>Welcome {User.username && User.username.toUpperCase()} !</h1>
            </Box>
            <ProductItem products={products}
            handleIconclick={props.handleIconclick} />
        <Footer/>
        </div>

    );
}

export default Home;