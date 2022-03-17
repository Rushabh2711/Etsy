import React, {useState} from 'react';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const MyOrder = (props) => {
   return( 
    <div>
        <Navbar/>
            <Box mt={2}>
                <h1 style={{"text-align": "center"}}>My Purchases</h1>
            </Box>
            <Divider />
        <Footer/>
    </div>
    );
}

export default MyOrder;