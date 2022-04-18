import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Slider, Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';
import { red } from '@mui/material/colors';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProduct, searchItem } from '../actions';

export default function ProductItem(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Currency = useSelector(state => state.Currency);
  const searchText = useSelector(state => state.SearchItem);
  const [products, setproducts] = useState([]);
  const [sortValue, setSortValue] = useState();

  if(searchText) {

  }

  const [sliderValue, setsliderValue] = useState(0);

  useEffect(() => {
    var data = [];
    if(searchText) {
      props.products.forEach(p => {
        if (p.name.includes(searchText)) {
          data.push(p);
        }
      });
      setproducts(data);
    }
    else {
      setproducts(props.products);
    }
   
  }, [props.products, searchText])
  const handleFavClick = (e) => {
      props.handleIconclick(e);
  }

  const handleImageClick = (e) => {
    dispatch(searchItem(""))
    navigate( "/item/" + e._id);
  }

  const handleEditClick = (e) => {
    dispatch(editProduct(e));
    props.handleEditItemClick();
  }

  const handleChipClick = () => {

  }

  const handleChipDelete = () => {
    dispatch(searchItem(""))
  }

  // console.log("product items",products);
  // var products = props.products;
  // const isUser = false;
  return (
    <div>
     {searchText && <Grid container>
        <Grid xs={7}>
            {searchText && <Chip
            label={searchText}
            onClick={handleChipClick}
            onDelete={handleChipDelete}
            variant="outlined"
          />}
        </Grid>
        <Grid xs={3} textAlign='center'>
        <Typography id="non-linear-slider" gutterBottom>
          Price
        </Typography>
          <Slider sx={{ mb:2, color:'black' }}
            style={{ maxWidth: 200 }}
            value={sliderValue}
            onChange={(e) => setsliderValue(e.target.value)}
            min={0}
            valueLabelDisplay="auto"
            step={1}
            max={1000}/>
        </Grid>
        <Grid xs={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="sortValue">Sort By</InputLabel>
                <Select
                    labelId="sortValue-label"
                    id="sortValue-select"
                    value={sortValue}
                    label="sortValue"
                    onChange={(e) => setSortValue(e.target.value)} >
                    <MenuItem value={'P'}>price</MenuItem>
                    <MenuItem value={'Q'}>Quantity</MenuItem>
                    <MenuItem value={'S'}>Sale Count</MenuItem>
                </Select>
          </FormControl>
          <div><Checkbox sx={{ color:'black' }} label="exclude out of stock" />Exclude out of stock</div>
        </Grid>
    </Grid>}
    <ImageList cols={5}>
      {products.map((item, index) => (
        <ImageListItem key={item._id}  >
          <img
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
            onClick={() => handleImageClick(item)}
            width='100'
            style={{"width":"100", "height":"100"}}
            height='100'
          />
          <ImageListItemBar
            title={item.name}
            // subtitle={Currency + " " + item.price}
            subtitle={
              <div>
              {Currency + " " + item.price}<br/>
              {"sell count: " + item.sell_count}
              </div>
            }
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                {!props.isUser ? !item.isFav ? <FavoriteIcon onClick={() => handleFavClick(item)}/> :
                <FavoriteIcon sx={{ color: red[700] }} onClick={() => handleFavClick(item)}/>
                : props.canEdit && <EditIcon onClick={() => handleEditClick(item)}/>}
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

