import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FirstShop from '../components/FirstShop';
import ShopDetails from '../components/ShopDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { getShopDetails, getUserShopDetails } from '../services/ShopService';
import { useQuery } from "@apollo/client";
import { GET_SHOP_PRODUCTS, GET_SHOP } from "../graphql/queries";


const Shop = (props) => {

    const products = useSelector(state => state.Products);
    const userId = useSelector(state => state.LoggedInUSer);
    const [shopProducts, setShopProducts] = useState([]);
    const [ShopDetailsData, setShopDetailsData] = useState([]);
    const isShop = true;
    var {shopId} = useParams();
    // var data;
    useEffect( async () => {
        try{
            // const data = shopId ? await getShopDetails(shopId) : null;
            // const UsershopDetails = userId ? await getUserShopDetails(userId) : null;
            const data = shopId ? await getShopDetails(shopId) : await getUserShopDetails(userId);
            // console.log(products, "Products in shop");
            // const currShop = shopId ? shopId : UsershopDetails._id
            setShopDetailsData(data)
            setShopProducts(products.filter((p) => p.shop_id === data._id));
        }
        catch(error){
            console.log(error);
        }
        
    },[products]);

   return( 
        <div>
            <Navbar/>
            {!ShopDetailsData ? <FirstShop/> : <ShopDetails products={shopProducts} shopData={ShopDetailsData}/>}

            <Footer/>
        </div>
    );
}

export default Shop;