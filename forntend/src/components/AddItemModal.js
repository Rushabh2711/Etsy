import React, {useState} from 'react';
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
    const productData = useSelector(state => state.editProduct);
    console.log("FROM MODAL ITEM",productData);
    // const [selectedImage, setSelectedImage] = useState(null);
    const [Category, setCategory] = useState("");
    const handleChange = (event) => {
        setCategory(event.target.value);
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
               margin="dense" />
            </div>
            <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="category">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={Category}
                    label="Category"
                    onChange={handleChange}
                >
                     <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Clothing"}>Clothing</MenuItem>
                    <MenuItem value={"Jewellery"}>Jewellery</MenuItem>
                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                </Select>
                </FormControl>
            <div>
            <div>
            <TextField id="description" 
               label="description"
               error={false} 
               variant="outlined"
               margin="dense"
               multiline />
            </div>
            <div>
            <TextField id="price" 
               label="Price"
               error={false} 
               variant="outlined"
               type="number"
               margin="dense" />
            </div>
            <div>
            <TextField id="quantity" 
               label="Quantity"
               error={false} 
               variant="outlined"
               type="number"
               margin="dense" />
            </div>
                <Button style={{backgroundColor: "#000000", color: "#ffffff"}} variant="outlined">Submit Item</Button>
            </div>
            </Box>
        </Modal>
      </div>
    );
 }

 export default AddItemModal;