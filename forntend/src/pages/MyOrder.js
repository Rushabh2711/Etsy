import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { getOrder, getProducts } from '../services/ProductService';
import { product } from '../actions';

const MyOrder = (props) => {

    const dispatch = useDispatch();

    const LoggedInUSer = useSelector(state => state.LoggedInUSer);
    const products = useSelector(state => state.Products);
    const [myOrder, setmyOrder] = useState();
    var data = [];
    useEffect( async () => {
        data = await getOrder(LoggedInUSer);
        var newProduct = await getProducts();
        newProduct.forEach(p => {
            products.forEach(f => {
                if(p.product_id === f.product_id && f.isFav) {
                    p.isFav = true;
                }
            })
        });
        dispatch(product(newProduct));
        console.log(data);
        setmyOrder(data);
    },[LoggedInUSer]);


   return(
        <div>
            <Navbar/>
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>My Purchases</h1>
                    {JSON.stringify(myOrder)}
                </Box>
                <Divider />
            <Footer/>
        </div>
    );
}

export default MyOrder;