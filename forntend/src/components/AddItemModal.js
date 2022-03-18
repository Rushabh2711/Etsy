import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { addProducts, getProducts, updateProduct } from '../services/ProductService';
import { product } from '../actions';




const AddItemModal = (props) => {

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const dispatch = useDispatch();
    const editProductData = useSelector(state => state.editProduct);
    // console.log(editProductData.product_id);
    const products = useSelector(state => state.Products);
    console.log("FROM MODAL ITEM",editProductData);
    // const [selectedImage, setSelectedImage] = useState(null);

    const [productName, setProductName] = useState(editProductData.name);
    const [description, setDescription] = useState(editProductData.description);
    const [price, setPrice] = useState(editProductData.price);
    const [quantity, setQuantity] = useState(editProductData.count);
    const [Category, setCategory] = useState(editProductData.category);
    const [sellCount, setSellCount] = useState(editProductData.sell_count);

    const userId = useSelector(state => state.LoggedInUSer);

    useEffect(() => {
      setProductName(editProductData.name);
      setDescription(editProductData.description);
      setPrice(editProductData.price);
      setQuantity(editProductData.count);
      setCategory(editProductData.category);
      setSellCount(editProductData.sell_count);
    }, [editProductData])

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmitClick = async () => {
      var data = {
        shop_id: props.shopData.shop_id,
        category: Category,
        count: parseInt(quantity),
        name: productName,
        description: description,
        image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        sell_count: editProductData.sell_count ? editProductData.sell_count : 0,
        price: parseInt(price)
      }
      try {
        if(editProductData.product_id) {
          // var data = {
          //   shop_id: props.shopData.shop_id,
          //   category: Category ? Category : editProductData.category,
          //   count: editProductData.count ? editProductData.count : parseInt(quantity),
          //   name: editProductData.name ? editProductData.name : productName,
          //   description: editProductData.description ? editProductData.description : description,
          //   image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
          //   sell_count: editProductData.sell_count ? editProductData.sell_count : 0,
          //   price: editProductData.price ? editProductData.price : parseInt(price)
          // }
          await updateProduct({...data, product_id: editProductData.product_id})
        }
        else if(userId) {
          // var data = {
          //   shop_id: props.shopData.shop_id,
          //   category: Category,
          //   count: parseInt(quantity),
          //   name: productName,
          //   description: description,
          //   image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
          //   sell_count: 0,
          //   price: parseInt(price)
          // }
            await addProducts(data);
            // var newData = await getProducts();
            // props.handleAddItemClose();
            // dispatch(product(newData));
        }
        var newData = await getProducts();
        props.handleAddItemClose();
        dispatch(product(newData));

      } catch (error) {
        
      }
    };
    // console.log(selectedImage);
  
    return (
      <div>
        <Modal
        open={props.openAddItem}
        onClose={props.handleAddItemClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <Box sx={style} component="form">
            {/* <Button variant="contained" component="label">Upload File
                <input type="file" hidden onChange={e => setSelectedImage(e.target.files[0])}/> 
            </Button>
            <img src={selectedImage} alt='Etsy' loading="lazy" width="120" height="120"/> */}
            <div>
            <TextField id="productname" 
               label="Product Name"
               error={false} 
               variant="outlined"
               defaultValue={editProductData.name}
               onChange={(e) => setProductName(e.target.value)}
               margin="dense" />
            </div>
            <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="category">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={editProductData.category ? editProductData.category : Category}
                    label="Category"
                    onChange={handleChange}
                >
                     <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Clothing'}>Clothing</MenuItem>
                    <MenuItem value={'Jewellery'}>Jewellery</MenuItem>
                    <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                    <MenuItem value={'Home Decor'}>Home Decor</MenuItem>
                </Select>
                </FormControl>
            <div>
            <div>
            <TextField id="description" 
               label="description"
               error={false} 
               variant="outlined"
               defaultValue={editProductData.description}
               onChange={(e) => setDescription(e.target.value)}
               margin="dense"
               multiline />
            </div>
            <div>
            <TextField id="price" 
               label="Price"
               error={false} 
               variant="outlined"
               defaultValue={editProductData.price}
               onChange={(e) => setPrice(e.target.value)}
               type="number"
               margin="dense" />
            </div>
            <div>
            <TextField id="quantity" 
               label="Quantity"
               error={false} 
               variant="outlined"
               defaultValue={editProductData.count}
               onChange={(e) => setQuantity(e.target.value)}
               type="number"
               margin="dense" />
            </div>
                <Button style={{backgroundColor: "#000000", color: "#ffffff"}} onClick={handleSubmitClick} variant="outlined">Submit Item</Button>
            </div>
            </Box>
        </Modal>
      </div>
    );
 }

 export default AddItemModal;