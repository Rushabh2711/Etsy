import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import ProductItem from './ProductItem';
import Button from '@mui/material/Button';
import AddItemModal from './AddItemModal';



const ShopDetails = (props) => {

    const user = "Rushabh Store"
    const [openAddItem, setopenAddItem] = React.useState(false);
    const handleAddItemClick = () => setopenAddItem(true);
    const handleAddItemClose = () => setopenAddItem(false);
   return( 
        <div>
            <Container maxWidth="lg">
                <Box mt={2}>
                    <Grid container>
                        <Grid xs={2}>
                            <img src='https://t3.ftcdn.net/jpg/00/84/43/86/360_F_84438633_CnVRXjN4oABKvgN8F9IJIOrIMdIyun9x.jpg' 
                                alt='Etsy' loading="lazy" width="120" height="120"/>
                        </Grid>
                        <Grid xs={9}>
                            <h1>{user}</h1>
                            <h6>Contact : 123-123-2134</h6>
                        </Grid>
                        <Grid xs={1}>
                        <Button variant="outlined" style={{backgroundColor: "#000000", color: "#ffffff"}} size="small" onClick={handleAddItemClick}>Add Item</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle" />
                <h1>Shop Items</h1>
                <ProductItem products={props.products} isUser={true}/>
                <AddItemModal openAddItem={openAddItem} handleAddItemClose={handleAddItemClose}/>
            </Container>
        </div>
    );
}

export default ShopDetails;