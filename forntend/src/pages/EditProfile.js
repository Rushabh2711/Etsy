import React, {useState} from 'react';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, TextField, Divider, Box, FormControl, Button, Radio, IconButton, Grid, FormControlLabel, FormLabel, RadioGroup, InputLabel, Select, MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import EditIcon from '@mui/icons-material/Edit';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { countryList } from '../country';

const EditProfile = (props) => {

    const [birthDate, setBirthDate] = useState();
    const [country, setcountry] = useState("");

    const handleRadioChange = (e) => {
        console.log(e.target.value);
    }
    const handleCountyChange = (event) => {
        setcountry(event.target.value);
      };

    const handleEditClick = () => {

    }

    return( 
        <div>
            <Navbar/>
                <Container maxWidth="sm">
                <Box mt={2}>
                    <h1 style={{"text-align": "center"}}>Your Public Profile</h1>
                    <h4 style={{"text-align": "center"}}>Everything on this page can be seen by anyone</h4>
                </Box>
                <Box mt={2}>
                    <Grid container>
                        <Grid xs={3}>
                            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' 
                                alt='Etsy' loading="lazy" width="120" height="120"/>
                        </Grid>
                        <Grid xs={9}>
                        <IconButton style={{backgroundColor: "#000000", color: "#ffffff"}}><EditIcon/></IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                <TextField id="name" 
                    label="Your Name" 
                    error={false} 
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => (console.log(e))} />
                <Divider />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        onChange={(e) => handleRadioChange(e)}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Divider />
                <TextField id="phoneno" 
                    label="Phone Number"
                    error={false} 
                    variant="outlined"
                    type="number"
                    margin="dense" />
                    <Divider/>
                <TextField id="email" 
                    label="Email" 
                    error={false} 
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => (console.log(e))} />
                     <Divider/>
                <TextField id="address" 
                    label="Address"
                    error={false} 
                    variant="outlined"
                    margin="normal"
                    multiline />
                <Divider/>
                <TextField id="city" 
                    label="City" 
                    error={false} 
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => (console.log(e))} />
                <Divider/>
                <div>
                    <FormControl sx={{ mt: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={country}
                        onChange={handleCountyChange}
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
                <Divider sx={{ mb: 2}}/>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker 
                        label="Birth Date"
                        value={birthDate}
                        
                        onChange={(birthDate) => {
                        setBirthDate(birthDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Divider sx={{ mt: 2}}/>
                <TextField id="about" 
                label="About"
                error={false} 
                variant="outlined"
                margin="normal"
                multiline />
                <Divider/>
                <Box textAlign='center'>
                        <Button sx={{ m: 2 }} style={{backgroundColor: "#000000", color: "#ffffff"}} onClick={handleEditClick}>Edit Profile</Button>
                </Box>
                    </Box>
                </Container>
            <Footer/>
        </div>
    );
}

export default EditProfile;