import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';



const Favorite = (props) => {

    const navigate = useNavigate();
    const [favProducts, setFavProducts] = useState([]);
    const products = useSelector(state => state.Products);
    const User = useSelector(state => state.User);


    useEffect(() => {
         setFavProducts(products.filter((p) => p.isFav === true));
    },[products]);

    const handleEditClick = () => {
        navigate('/EditProfile');
    } 

    return( 
        <div>
            <Navbar/>
            {User.username && <Container maxWidth="lg">
                <Box mt={2}>
                    <Grid container>
                        <Grid xs={2}>
                            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' 
                                alt='Etsy' loading="lazy" width="120" height="120"/>
                        </Grid>
                        <Grid xs={2}>
                            <h1>{User.username.toUpperCase()}</h1>
                            <h6>0 Following | 0 Followers</h6>
                        </Grid>
                        <Grid xs={8}>
                            <IconButton style={{backgroundColor: "#000000", color: "#ffffff"}} onClick={handleEditClick}><EditIcon/></IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle" />
                <h1>Favorite Items</h1>
                <ProductItem products={favProducts}  handleIconclick={props.handleIconclick}/>
            </Container>}
            <Footer/>
        </div>

    );
}

export default Favorite;