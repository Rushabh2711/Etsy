import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { createOrder, updateProduct, getProducts } from '../services/ProductService';
import { clearCart, product } from '../actions';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const Cart = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector(state => state.Products);
    const currency = useSelector(state => state.Currency);
    const cartItem = useSelector(state => state.CartItem);
    const LoggedInUSer = useSelector(state => state.LoggedInUSer);
    

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
          var data = []; 
          cartItem.forEach(c => {
              products.forEach(p => {
                  if(p.product_id === c.product_id) {
                      data.push({
                        ...p,
                        quantity: c.quantity,
                      })
                  }
              })
          });
          console.log(data);
          setCartData(data);
    },[products, cartItem]);

    const handleCheckOutClick = async () => {
      if(LoggedInUSer) {
        const data = {
          user_id: LoggedInUSer,
          price: total,
          date: new Date(),
          products: cartData
        }
        try {
          await createOrder(data);
          cartData.forEach( async (o) => {
            var p = {
              ...o,
              sell_count: parseInt(o.quantity),
              count: (o.count - parseInt(o.quantity))
            };
            await updateProduct(p);
          });
          var newProduct = await getProducts();
          dispatch(product(newProduct));
          dispatch(clearCart([]));
          navigate('/myorder');
        } catch (error) {
          console.log(error);
        }
      }
    }
    var total = 0;
    cartData.forEach((i) => {
      total += parseInt(i.quantity)*i.price;
    }); 
   return(
    
        <div>
            <Navbar/>
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>Cart Items</h1>
                </Box>
                {/* <Divider /> */}
                {cartData.map((item, index) => (
                  <Items item={item}/>
                ))}
                {/* <Divider /> */}
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>{"Total Price: " + total}</h1>
                    <Box textAlign='center'>
                        <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleCheckOutClick}>proceed to checkout</Button>
                    </Box>
                </Box>
            <Footer/>
        </div>
    );
}

const Items = (props) => {
    const currency = useSelector(state => state.Currency);
    const p = props.item;
    
    return (
        <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 700,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={5} key={p.product_id}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 100 }}>
              <Img alt="complex" src={p.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {p.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Quantity: " + p.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"Item Price: " + currency + " " + p.price}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {currency + " " + p.price*parseInt(p.quantity)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Paper>
    );
}

export default Cart;