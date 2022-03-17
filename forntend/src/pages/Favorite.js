import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';


const Favorite = (props) => {

    const user = "Rushbah Sheta";
    const [favProducts, setFavProducts] = useState([]);
    const products = useSelector(state => state.Products);

    useEffect(() => {
         setFavProducts(products.filter((p) => p.isFav === true));
    },[]);

    return( 
        <div>
            <Navbar/>
            <Container maxWidth="lg">
                <Box mt={2}>
                    <Grid container>
                        <Grid xs={2}>
                            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' 
                                alt='Etsy' loading="lazy" width="120" height="120"/>
                        </Grid>
                        <Grid xs={10}>
                            <h1>{user}</h1>
                            <h6>0 Following | 0 Followers</h6>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle" />
                <h1>Favorite Items</h1>
                <ProductItem products={favProducts}/>
            </Container>
            <Footer/>
        </div>

    );
}

export default Favorite;