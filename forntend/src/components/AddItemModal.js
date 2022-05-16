import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import {Button, Grid, IconButton} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import { Checkbox } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { addProducts, getProducts, updateProduct } from '../services/ProductService';
import { product } from '../actions';
import { insertImage } from '../services/UserService';
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutations";




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
    // console.log(editProductData._id);
    const products = useSelector(state => state.Products);
    console.log("FROM MODAL ITEM",editProductData);
    // const [selectedImage, setSelectedImage] = useState(null);
    const [addProduct, { error }] = useMutation(REGISTER_USER);

    const [productName, setProductName] = useState(editProductData.name);
    const [description, setDescription] = useState(editProductData.description);
    const [price, setPrice] = useState(editProductData.price);
    const [quantity, setQuantity] = useState(editProductData.count);
    const [image, setimage] = useState(editProductData.image);
    const [Category, setCategory] = useState(editProductData.category);
    const [addNew, setAddNew] = useState(false);
    const [sellCount, setSellCount] = useState(editProductData.sell_count);

    const userId = useSelector(state => state.LoggedInUSer);

    useEffect(() => {
      setProductName(editProductData.name);
      setDescription(editProductData.description);
      setPrice(editProductData.price);
      setQuantity(editProductData.count);
      setimage(editProductData.image)
      setCategory(editProductData.category);
      setSellCount(editProductData.sell_count);
    }, [editProductData])

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleCheckClick = (e) => {
      if(e.target.checked) {
        setAddNew(true);
      }
      else {
        setAddNew(false);
      }
    }

    const handleImageuplod = async (e) => {
      console.log("info",e); 
      const url = await insertImage(e.target.files[0],props.shopData._id+props.shopData.name+Math.random());
      setimage(url);
      console.log(url);
    }

    const handleSubmitClick = async () => {
      var data = {
        shop_id: props.shopData._id,
        category: Category,
        count: parseInt(quantity),
        name: productName,
        description: description,
        image: image,
        sell_count: editProductData.sell_count ? editProductData.sell_count : 0,
        price: parseFloat(price)
      }
      try {
        if(editProductData._id) {
          // var data = {
          //   shop_id: props.shopData._id,
          //   category: Category ? Category : editProductData.category,
          //   count: editProductData.count ? editProductData.count : parseInt(quantity),
          //   name: editProductData.name ? editProductData.name : productName,
          //   description: editProductData.description ? editProductData.description : description,
          //   image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
          //   sell_count: editProductData.sell_count ? editProductData.sell_count : 0,
          //   price: editProductData.price ? editProductData.price : parseInt(price)
          // }
          await updateProduct({...data, _id: editProductData._id})
        }
        else if(userId) {
          var data = {
            shop_id: props.shopData._id,
            category: Category,
            count: parseInt(quantity),
            name: productName,
            description: description,
            image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            sell_count: 0,
            price: parseInt(price)
          }
            // await addProducts(data);
            addProduct({
              variables: {
                ...data
              },
            });

            // var newData = await getProducts();
            // props.handleAddItemClose();
            // dispatch(product(newData));
        }
        var newData = await getProducts();
        newData.forEach(p => {
            products.forEach(f => {
                if(p._id === f._id && f.isFav) {
                    p.isFav = true;
                }
            })
        });
        props.handleAddItemClose();
        dispatch(product([...newData]));

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
            <Box mt={2}>
                    <Grid container>
                        <Grid xs={6}>
                            <img src={image}
                                alt='' loading="lazy" width="120" height="120"/>
                        </Grid>
                        <Grid xs={6}>
                          <label htmlFor="upload-photo-modal">
                              <input
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  id="upload-photo-modal"
                                  name="upload-photo-modal"
                                  type="file"
                                  onChange={(e) => handleImageuplod(e)}
                              />
                               <AddPhotoAlternateIcon/>
                            </label>
                        </Grid>
                    </Grid>
                </Box>
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
            {!addNew ? <FormControl sx={{ minWidth: 200 }}>
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
                : <div>
                <TextField id="newcategory" 
                   label="New Category"
                   error={false} 
                   variant="outlined"
                   onChange={(e) => handleChange(e)}
                   margin="dense" />
                </div>
                }
            <div>
              <div><Checkbox sx={{ color:'black' }} label="new-category" onClick={(e) => handleCheckClick(e)}/>Add new Category</div>
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