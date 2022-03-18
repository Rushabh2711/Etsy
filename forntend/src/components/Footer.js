import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currency } from '../actions';
import { countryList, currencyList } from '../country';

export default function Footer() {

    const dispatch = useDispatch();

    const Currency = useSelector(state => state.Currency);
    const [country, setcountry] = useState("United States");
    const [currencyState, setCurrency] = useState("$ USD");
    const [openModal, setOpenModal] = useState(false);
    

    const handleClose = () => setOpenModal(false);

    const handleClick = () => {
        setOpenModal(true);
    }

    const handleCountryChange = (e) => {
        setcountry(e.target.value);
    }
    
    const handleCurrentcyChange = (e) => {
        setCurrency(e.target.value);
        dispatch(currency(e.target.value.split(" ")[0]));
    }
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
                    <Grid>
                        <Grid item xs={4}>
                            <Button variant="text" color="error" onClick={handleClick}>{country} | {Currency}</Button>
                            &reg; Etsy, Inc. {new Date().getFullYear()}
                        </Grid>
                        <CountryModal 
                        openModal={openModal} 
                        country={country}
                        handleCountryChange={handleCountryChange}
                        handleCurrentcyChange={handleCurrentcyChange}
                        handleClose={handleClose}
                        currency={currencyState}/>
                    </Grid>
                </Box>
            
        </footer>
    );
}

const CountryModal = (props) => {
  
     const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
      return (
        <div>
          <Modal
            open={props.openModal}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form">
              <div>
                 <h4>Update your settings</h4>
              </div>
              <div>
                <FormControl sx={{ mt: 1, minWidth: 200 }}>
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="country-select"
                    value={props.country}
                    onChange={props.handleCountryChange}
                    autoWidth
                    label="Country"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {countryList.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            >
                            {name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </div>
                <div>
                <FormControl sx={{ mt: 1, minWidth: 200 }}>
                    <InputLabel id="currency">Currency</InputLabel>
                    <Select
                    labelId="currency-select"
                    id="currency-autowidth"
                    value={props.currency}
                    onChange={props.handleCurrentcyChange}
                    autoWidth
                    label="Currency"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {currencyList.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            >
                            {name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </div>
            </Box>
          </Modal>
        </div>
      );
   }