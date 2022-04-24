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
import TextField from '@mui/material/TextField';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createOrder, updateProduct, getProducts } from '../services/ProductService';
import { clearCart, product, addToCart, remeveFromCart } from '../actions';



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
                  if(p._id === c._id) {
                      data.push({
                        ...p,
                        quantity: c.quantity,
                        gift: c.gift
                      })
                  }
              })
          });
          console.log(data);
          setCartData(data);
    },[products, cartItem]);

    const handleRemoveClick = (e) => {
      const data = cartItem.filter(p => p._id !== e._id);
      dispatch(remeveFromCart(data));
    }


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
          
        //   var newProduct = await getProducts();
        //   newProduct.forEach(p => {
        //     products.forEach(f => {
        //         if(p._id === f._id && f.isFav) {
        //             p.isFav = true;
        //         }
        //     })
        // });
        //   dispatch(product(newProduct));
          dispatch(clearCart([]));
          navigate('/myorder');
        } catch (error) {
          console.log(error);
        }
      }
    }
    var total = 0;
    cartData.forEach((i) => {
      total += Math.round((parseInt(i.quantity)*i.price)*100)/100;
    }); 
   return(
    
        <div>
            <Navbar/>
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>Cart Items</h1>
                </Box>
                {/* <Divider /> */}
                {cartData.map((item, index) => (
                  <Items item={item} handleRemoveClick={handleRemoveClick} />
                ))}
                {/* <Divider /> */}
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>{"Total Price: " + Math.round(total*100)/100}</h1>
                    <Box textAlign='center'>
                        <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleCheckOutClick}>proceed to checkout</Button>
                    </Box>
                </Box>
            <Footer/>
        </div>
    );
}

const Items = (props) => {

    const dispatch = useDispatch();
    const currency = useSelector(state => state.Currency);
    const cartItem = useSelector(state => state.CartItem);
    const [addGift, setAddGift] = useState(false);
    const [isItemAvailable, setIsItemAvailable] = useState(true);
    const p = props.item;
    
    const handleItemchnage = (e) => {
      if(e.target.value > p.count) {
        setIsItemAvailable(false);
      }
      else if(e.target.value == 0) {
        props.handleRemoveClick(p);
      }
      else {
        setIsItemAvailable(true);
        var data = cartItem;
        data.forEach(d => {
          if(d._id === p._id) {
            d.quantity = e.target.value;
          }
        });
        dispatch(remeveFromCart([...data]));
      }
  }

  const handleCheckClick = (e) => {
    if(e.target.checked) {
      setAddGift(true);
    }
    else {
      setAddGift(false);
    }
  }

  const handleGiftChange = (e) => {
    var data = cartItem;
    data.forEach(d => {
      if(d._id === p._id) {
        d.gift = e.target.value;
      }
    });
    dispatch(remeveFromCart([...data]));
  }

    return (
        <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 700,
          flexGrow: 1,
          boxShadow: 10,
          mt:2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={5} key={p._id}>
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
                <TextField id="quantity" 
                    label="Quantity"
                    sx={{mt:2}}
                    error={!isItemAvailable}
                    defaultValue={p.quantity}
                    variant="outlined"
                    type="number"
                    onChange={(e) => handleItemchnage(e)}
                    helperText={p.count + " items available"} />
                    <div><Checkbox sx={{ color:'black' }} label="gift" onClick={(e) => handleCheckClick(e)}/>Add Gift Packing</div>
                  {addGift && <TextField id="gift" 
                   label="message"
                   error={false} 
                   variant="outlined"
                   onChange={(e) => handleGiftChange(e)}
                   margin="dense" />}
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer', textAlign: 'center', mr:2, color: 'red'}} variant="subtitle1" onClick={() => props.handleRemoveClick(p)}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {currency + " " + Math.round((p.price*parseInt(p.quantity))*100)/100}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
}

export default Cart;