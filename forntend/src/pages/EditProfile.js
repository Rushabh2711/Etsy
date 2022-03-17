import React, {useState} from 'react';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, TextField, Divider, Box, FormControl, Radio, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';

const EditProfile = (props) => {



    return( 
        <div>
            <Navbar/>
                <Container maxWidth="sm">
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>Your Public Profile</h1>
                    <h4 style={{"text-align": "center"}}>Everything on this page can be seen by anyone</h4>
                </Box>
                <Box>
                <TextField id="name" 
                    label="Your Name" 
                    error={false} 
                    variant="outlined" 
                    margin="dense"
                    onChange={(e) => (console.log(e))} />
                <Divider />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Divider />
                <TextField id="password" 
                    label="Password" 
                    type="password" 
                    error={false} 
                    variant="outlined" 
                    margin="dense"
                    onChange={(e) => (console.log(e))} />
                    </Box>
                </Container>
            <Footer/>
        </div>
    );
}

export default EditProfile;