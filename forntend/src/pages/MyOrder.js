import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { getOrder } from '../services/ProductService';

const MyOrder = (props) => {

    const LoggedInUSer = useSelector(state => state.LoggedInUSer);
    const [myOrder, setmyOrder] = useState();
    var data = [];
    useEffect( async () => {
        data = await getOrder(LoggedInUSer);
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