import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { red, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

const Item = (props) => {
    // var product = {
    //     "category_id": 3,
    //     "count": 7,
    //     "description": "description",
    //     "image": "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    //     "isFav": true,
    //     "name": "product name 11",
    //     "price": 20,
    //     "product_id": 11,
    //     'sell_count': 7,
    //     'shop_id': 5
    // }
    const products = useSelector(state => state.Products);
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    const {itemId} = useParams();
    console.log(itemId);

    useEffect(() => {
        const item = products.find((p) => p.product_id === parseInt(itemId));
        setProduct(item);
   },[]);

    const handleCartClick = () => {
        navigate('/cart');
    }

    const handleShopClick = () => {
        navigate("/shop/" + product.shop_id);
    }

   return( 
        <div>
            <Navbar/>
                {product && <Container maxWidth="lg">
                    <Box mt={2}>
                        <Grid container>
                            <Grid xs={5}>
                                <img src={`${product.image}?w=248&fit=crop&auto=format`}
                                    alt='Etsy' loading="lazy" width="450" height="450"/>
                            </Grid>
                            <Grid xs={1}>
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${product.title}`}
                                    onClick={() => props.handleIconclick(product)}
                                >
                                    {!product.isFav ? <FavoriteIcon sx={{ color: grey[700] }}/> :
                                    <FavoriteIcon sx={{ color: red[700] }}/>}
                                </IconButton>
                            </Grid>
                            <Grid xs={6}>
                                <h1>{product.name}</h1>
                                <h3>{product.description}</h3>
                                <h2><Link
                                    component="button"
                                    variant="body2"
                                    onClick={handleShopClick}
                                    style={{ color: "#000000"}}
                                >
                                Go to Shop
                                </Link></h2>
                                <TextField id="quantity" 
                                label="Quantity"
                                error={false}
                                variant="outlined"
                                type="number"
                                helperText={product.count + " items available"} />
                                
                            </Grid>
                        </Grid>
                    </Box>
                    <Box textAlign='center'>
                        <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} onClick={handleCartClick}>Add To Cart</Button>
                    </Box>
                </Container>}
            <Footer/>
        </div>
    );
}

export default Item;