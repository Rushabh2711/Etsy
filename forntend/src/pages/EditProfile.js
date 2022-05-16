import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, TextField, Divider, Box, FormControl, Button, Radio, IconButton, Grid, FormControlLabel, FormLabel, RadioGroup, InputLabel, Select, MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { countryList } from '../country';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../services/UserService';
import { userLogin } from '../actions';
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../graphql/mutations";

const EditProfile = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector(state => state.User);
    const userId = useSelector(state => state.LoggedInUSer);

    const [editUser, { error }] = useMutation(EDIT_USER);

    const [birthDate, setBirthDate] = useState();
    const [country, setcountry] = useState("United States");
    const [userName, setUserName] = useState();
    const [gender, setGender] = useState();
    const [phoneno, setPhoneno] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [image, setImage] = useState(userData.image);
    const [city, setCity] = useState();
    const [about, setAbout] = useState();

    // useEffect(() => {
    //     setUserName(userData.username);
    //     setEmail(userData.email)
    // },[userData])

    const handleRadioChange = (e) => {
        console.log(e.target.value);
    }
    const handleCountyChange = (event) => {
        setcountry(event.target.value);
      };

    const handleEditClick = async () => {
        if(userId) {
            var data = {
                user_id: userId,
                username: userName ? userName : userData.username,
                email: email ? email : userData.email,
                about,
                dob: birthDate,
                address, 
                city, 
                country,
                image, 
                gender, 
                phoneno
            }
            try {
                await updateUserDetails(data);
                dispatch(userLogin(data));
                navigate('/')
            } catch (error) {
                
            }
            console.log(data);
        }
    }

    const handleMyPurchasesClick = () => {
        navigate('/myorder');
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
                            <img src={image ? image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                alt='Etsy' loading="lazy" width="120" height="120"/>
                        </Grid>
                        <Grid xs={6}>
                            <label htmlFor="upload-photo">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={async (info)=>{
                                        console.log("info",info); 
                                        // await insertImage(info.target.files[0]);
                                        setImage("https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80");
                                    }}
                                />
                               <AddPhotoAlternateIcon/>
                            </label>
                        </Grid>
                        <Grid xs={3}>
                        <Button style={{backgroundColor: "#000000", color: "#ffffff"}} onClick={handleMyPurchasesClick}>My Purchases</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                <TextField id="name" 
                    label="Your Name" 
                    defaultValue={userData.username}
                    error={false} 
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => (setUserName(e.target.value))} />
                <Divider />
                
                <TextField id="phoneno" 
                    label="Phone Number"
                    defaultValue={userData.phoneno}
                    error={false} 
                    variant="outlined"
                    onChange={(e) => setPhoneno(e.target.value)}
                    type="number"
                    margin="dense" />
                    <Divider/>
                <TextField id="email" 
                    label="Email" 
                    defaultValue={userData.email}
                    error={false} 
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)} />
                     <Divider/>
                <TextField id="address" 
                    label="Address"
                    defaultValue={userData.address}
                    error={false} 
                    variant="outlined"
                    onChange={(e) => setAddress(e.target.value)}
                    margin="normal"
                    multiline />
                <Divider/>
                <TextField id="city" 
                    label="City" 
                    defaultValue={userData.city}
                    error={false}
                    variant="outlined" 
                    margin="normal"
                    onChange={(e) => setCity(e.target.value)} />
                <Divider/>
                <div>
                    <FormControl sx={{ mt: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={country}
                        defaultValue={userData.country}
                        onChange={(e) => setcountry(e.target.value)}
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
                <FormControl >
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        defaultValue={userData.gender}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        onChange={(e) => setGender(e.target.value)}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Divider />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker 
                        label="Birth Date"
                        value={birthDate}
                        
                        onChange={(e) => {
                        setBirthDate(e);
                        console.log(e);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Divider sx={{ mt: 2}}/>
                <TextField id="about" 
                label="About"
                error={false} 
                variant="outlined"
                onChange={(e) => setAbout(e.target.value)}
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