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
import { Container } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries";

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    var data = [];
    useEffect( async () => {
        data = await getOrder(LoggedInUSer);
        var newProduct = await getProducts();
        newProduct.forEach(p => {
            products.forEach(f => {
                if(p._id === f._id && f.isFav) {
                    p.isFav = true;
                }
            })
        });
        dispatch(product(newProduct));
        console.log(data);
        // data.forEach(d => {
        //     d.products= [...JSON.parse(d.products)];
        // })
        console.log("AFTERR APPPYT", data);
        setmyOrder(data);
    },[LoggedInUSer]);


    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      parseInt(event.target.value);
      setPage(0);
    };

   return(
        <div>
            <Navbar/>
            {myOrder && <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>My Purchases</h1>
                    <Divider />
                    <TablePagination
                      rowsPerPageOptions={[2, 5, 10]}
                      component="div"
                      count={myOrder.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
                    />
                    {(rowsPerPage > 0
                      ? myOrder.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : myOrder).map((order, index) => {
                        return (
                          <Container maxWidth="md" sx={{ boxShadow: 10, mb: 5}}>
                                <h3 style={{"text-align": "center"}}>Order No: {order._id}</h3>
                                <h4 style={{"text-align": "center"}}>Total Price: {order.price}</h4>
                                <h4 style={{"text-align": "center"}}>{new Date(order.date).toDateString()}</h4>
                                <Orders productData={order.products}/>
                          </Container>
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
          boxShadow: 3,
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
                {p.gift && <Typography variant="body2">
                  {"Gift Message: " + p.gift}
                </Typography>}
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
      </Paper>
    );
}

export default MyOrder;