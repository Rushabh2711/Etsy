import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid, IconButton, Input } from '@mui/material';
import Divider from '@mui/material/Divider';
import ProductItem from './ProductItem';
import Button from '@mui/material/Button';
import AddItemModal from './AddItemModal';
import { getUserDetails, insertImage } from '../services/UserService';
import {updateShopDetails} from '../services/ShopService';
import { editProduct } from '../actions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { EDIT_SHOP } from "../graphql/mutations"





const ShopDetails = (props) => {
    const dispatch = useDispatch();
    // const user = "Rushabh Store"
    const userId = useSelector(state => state.LoggedInUSer);
    const user = useSelector(state => state.User);
    const canEdit = userId === props.shopData.user_id;
    const [openAddItem, setopenAddItem] = useState(false);
    const [shopImage, setshopImage] = useState();
    const [shopOwner, setshopOwner] = useState({});

    const [editShop, { error }] = useMutation(EDIT_SHOP);
    // const [getUserProfile, { error }] = useQuery(GET_USER);

    const handleAddItemClick = () => setopenAddItem(true);
    const handleAddItemClose = () => {
        setopenAddItem(false);
        dispatch(editProduct({}));
    }
    var totalSale = 0;
    props.products.forEach(p => {
        totalSale+=p.sell_count;
    });
    useEffect( async () => {
        try{
            const data = await getUserDetails(props.shopData.user_id);
            setshopOwner(data);
            // console.log("API DATA", data);
            
        }
        catch(error){
            console.log(error);
        }  
    },[props.shopData]);

    const handleImageuplod = async (e) => {
        console.log("info",e); 
        const url = await insertImage(e.target.files[0],props.shopData._id);
        const newData = await updateShopDetails(url,props.shopData._id);
        setshopImage(url);
      }

    // console.log("qener details:", shopOwner);
   return( 
        <div>
            <Container maxWidth="lg">
                <Box mt={2}>
                    <Grid container>
                        <Grid xs={3}>
                            <img src={shopImage ? shopImage : props.shopData.image} 
                                alt='Etsy' loading="lazy" width="220" height="220"/>
                                {canEdit && <label htmlFor="upload-photo">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={(e) => handleImageuplod(e)}
                                />
                               <AddPhotoAlternateIcon/>
                            </label>}
                        </Grid>
                        {canEdit && <Grid xs={1}>
                            {/* <label htmlFor="upload-photo">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                />
                               <AddPhotoAlternateIcon/>
                            </label> */}
                        </Grid>}
                        <Grid xs={7}>
                            <h1>{props.shopData.name && props.shopData.name.toUpperCase()}</h1>
                            <h4>Owner Name : {shopOwner.username}</h4>
                            <h4>Contact : {shopOwner.phoneno}</h4>
                            <h4>Email : {shopOwner.email}</h4>
                            {/* <h5>About : {shopOwner.about}</h5> */}
                        </Grid>
                        {canEdit && <Grid xs={1}>
                        <Button variant="outlined" style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleAddItemClick}>Add Item</Button>
                        </Grid>}
                    </Grid>
                </Box>
                <Divider variant="middle" />
                <h1>Shop Items</h1>
                {canEdit && <h3>Total Sales : {totalSale}</h3>}
                <ProductItem products={props.products} isUser={true} canEdit={canEdit} handleEditItemClick={handleAddItemClick}/>
                <AddItemModal openAddItem={openAddItem} handleAddItemClose={handleAddItemClose} shopData={props.shopData}/>
            </Container>
        </div>
    );
}

export default ShopDetails;