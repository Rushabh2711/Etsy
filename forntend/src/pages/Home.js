import React, {useState} from 'react';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = (props) => {
   return( 
       <div>
        <Navbar/>
            <ProductItem/>
        <Footer/>
       </div>
    
    );
}

export default Home;