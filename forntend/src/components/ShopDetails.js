import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import ProductItem from './ProductItem';
import Button from '@mui/material/Button';
import AddItemModal from './AddItemModal';
import { getUserDetails } from '../services/UserService';
import { editProduct } from '../actions';



const ShopDetails = (props) => {
    const dispatch = useDispatch();
    // const user = "Rushabh Store"
    const userId = useSelector(state => state.LoggedInUSer);
    const user = useSelector(state => state.User);
    const canEdit = userId === props.shopData.user_id;
    const [openAddItem, setopenAddItem] = useState(false);
    const [shopOwner, setshopOwner] = useState({});
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
    // console.log("qener details:", shopOwner);
   return( 
        <div>
            <Container maxWidth="lg">
                <Box mt={2}>
                    <Grid container>
                        <Grid xs={4}>
                            <img src='https://t3.ftcdn.net/jpg/00/84/43/86/360_F_84438633_CnVRXjN4oABKvgN8F9IJIOrIMdIyun9x.jpg' 
                                alt='Etsy' loading="lazy" width="220" height="220"/>
                        </Grid>
                        <Grid xs={7}>
                            <h1>{props.shopData.name && props.shopData.name.toUpperCase()}</h1>
                            <h4>Owner Name : {shopOwner.username}</h4>
                            <h4>Contact : {shopOwner.phoneno}</h4>
                            <h4>Email : {shopOwner.email}</h4>
                            <h5>About : {shopOwner.about}</h5>
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