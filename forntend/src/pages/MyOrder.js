import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getOrder, getProducts } from '../services/ProductService';
import { product } from '../actions';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

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
        data.forEach(d => {
            d.products= [...JSON.parse(d.products)];
        })
        console.log("AFTERR APPPYT", data);
        setmyOrder(data);
    },[LoggedInUSer]);


   return(
        <div>
            <Navbar/>
            {myOrder && <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>My Purchases</h1>
                    <Divider />
                    {myOrder.map((order, index) => {
                        return (
                            <div>
                                <h1 style={{"text-align": "center"}}>Order: {order.order_id}</h1>
                                <h4 style={{"text-align": "center"}}>Total Price: {order.price}</h4>
                                <Orders productData={order.products}/>
                                <Divider />
                            </div>
                        );  
                    }
                    )}
                </Box>}
                <Divider />
            <Footer/>
        </div>
    );
}

const Orders = (props) => {
    return (
        <div>{props.productData.map((p, index) => <OrderItems item={p}/>)}</div>
    );
}

const OrderItems = (props) => {
    const currency = useSelector(state => state.Currency);
    const p = props.item;
    console.log(p);
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
                {currency + " " + Math.round((p.price*parseInt(p.quantity))*100)/100}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Paper>
    );
}

export default MyOrder;