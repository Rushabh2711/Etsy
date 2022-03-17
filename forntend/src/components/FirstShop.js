import React, {useState} from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const FirstShop = (props) => {

    const [shopname, setShopName] = React.useState("");
    const handlebutttonClick = () => {
        console.log(shopname);
    }
    
    const handleChange = (e) => {
        setShopName(e.target.value);
    }

    const visible = true;

   return( 
    <div>
        <Box mt={2}>
            <h1 style={{"text-align": "center"}}>Name your shop</h1>
            <p  style={{"text-align": "center"}}>Don’t sweat it! You can just draft a name now and change it later.
                We find sellers <br/> often draw inspiration from what they sell, their style, pretty much anything goes. <br/>
                More naming tips</p>
            <Box textAlign='center'>
            <TextField onChange={handleChange} style={{"width": 500}} label="Shop Name" margin="dense" id="fullWidth" />
            </Box>    
            {visible ? <Box textAlign='center'>
                <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handlebutttonClick}>Check Availability</Button>
            </Box> :
            <Box textAlign='center'>
                <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handlebutttonClick}>Create Shop</Button>
            </Box>}
        </Box>
    </div>
    );
}

export default FirstShop;