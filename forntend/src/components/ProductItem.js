import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProduct } from '../actions';

export default function ProductItem(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Currency = useSelector(state => state.Currency);
  const [products, setproducts] = useState([]);
  useEffect(() => {
    setproducts(props.products);
  }, [props.products])
  const handleFavClick = (e) => {
      props.handleIconclick(e);
  }

  const handleImageClick = (e) => {
    navigate( "/item/" + e.product_id);
  }

  const handleEditClick = (e) => {
    dispatch(editProduct(e));
    props.handleEditItemClick();
  }

  console.log("product items",products);
  // var products = props.products;
  // const isUser = false;
  return (
    <ImageList sx={{ width: '100%', height: '100%' }}>
      <ImageListItem key="Subheader" cols={4}>
        <ListSubheader component="div"></ListSubheader>
      </ImageListItem>
      {products.map((item, index) => (
        <ImageListItem key={item.product_id}>
          <img
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
            onClick={() => handleImageClick(item)}
            width='100'
            height='100'
          />
          <ImageListItemBar
            title={item.name}
            subtitle={Currency + " " + item.price}
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
  );
}

