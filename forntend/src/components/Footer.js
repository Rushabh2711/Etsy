import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currency } from '../actions';

export default function Footer() {

    const Currency = useSelector(state => state.Currency);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(currency("$"));
    }
    var country = "USA";
    var sym = "$";
    var footer = {     
        "left": "0",
        "bottom": "0",
        "width": "100%",
        "background-color": "black",
        "color": "white",
        "text-align": 'center',
    }
    return (
        <footer style={footer}>
                <Box>
                    <Grid spacing={1}>
                        <Grid item xs={4}>
                            <Button variant="text" color="error" onClick={handleClick}>{country} | {sym}</Button>
                            &reg; Etsy, Inc. {new Date().getFullYear()}
                        </Grid>
                    </Grid>
                </Box>
            
        </footer>
    );
}