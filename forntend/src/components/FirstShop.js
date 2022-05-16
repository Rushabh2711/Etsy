import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addShopDetails, checkShopAvailability } from '../services/ShopService';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { SHOPNAME_AVAILABILITY } from "../graphql/queries";



const FirstShop = (props) => {

    const navigate = useNavigate();

    const [shopname, setShopName] = React.useState("");
    const [isAvailable, setIsAvailable] = React.useState(true);
    const [canCreate, setcanCreate] = React.useState(false);
    const LoggedInUSer = useSelector(state => state.LoggedInUSer);
    // const [getShopNameAvailability, { error }] = useQuery(SHOPNAME_AVAILABILITY);


    const handleAvailabilitybutttonClick = async () => {
        if(LoggedInUSer) {
            try {
                const data = await checkShopAvailability(shopname);
                console.log(data);
                if(data.length === 0) {
                    setIsAvailable(true);
                    setcanCreate(true);
                    return;
                }
                setIsAvailable(false);
                setcanCreate(false);
            } catch (error) {
                
            }
        }
    }

    const handleCreatebutttonClick = async () => {
        if(LoggedInUSer) {
            try {
                const data = await addShopDetails(shopname, LoggedInUSer);
                window.location.reload(false);
                // navigate('/shop/' + data._id);
            } catch (error) {
                
            }
            
        }
    }
    
    const handleChange = (e) => {
        setShopName(e.target.value);
    }
    useEffect( async () => {
        // data = await getOrder(LoggedInUSer);
        // console.log(data);
        // setmyOrder(data);
    },[]);

   return( 
    <div>
        <Box mt={2}>
            <h1 style={{"text-align": "center"}}>Name your shop</h1>
            <p  style={{"text-align": "center"}}>Don’t sweat it! You can just draft a name now and change it later.
                We find sellers <br/> often draw inspiration from what they sell, their style, pretty much anything goes. <br/>
                More naming tips</p>
            <Box textAlign='center'>
            <TextField onChange={handleChange} error={!isAvailable} disabled={canCreate} style={{"width": 500}} label="Shop Name" margin="dense" id="fullWidth" />
            </Box>    
            {!canCreate ? <Box textAlign='center'>
                <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleAvailabilitybutttonClick}>Check Availability</Button>
            </Box> :
            <Box textAlign='center'>
                <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleCreatebutttonClick}>Create Shop</Button>
            </Box>}
        </Box>
    </div>
    );
}

export default FirstShop;