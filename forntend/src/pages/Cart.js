import React, {useState} from 'react';
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



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const Cart = (props) => {
    const navigate = useNavigate();

    const handleCheckOutClick = () => {
        navigate('/myorder');
    }
   return( 
        <div>
            <Navbar/>
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>Cart Items</h1>
                </Box>
                <Divider />
                <Items/>
                <Items/>
                <Items/>
                <Items/>
                <Items/>
                <Items/>
                <Divider />
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>Total Price</h1>
                    <Box textAlign='center'>
                        <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleCheckOutClick}>proceed to checkout</Button>
                    </Box>
                </Box>
            <Footer/>
        </div>
    );
}

const Items = (props) => {
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
        <Grid container spacing={5}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src="https://images.unsplash.com/photo-1522770179533-24471fcdba45" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                $19.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
      </Paper>
    );
}

export default Cart;