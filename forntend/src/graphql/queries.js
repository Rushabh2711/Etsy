import { gql } from "@apollo/client";

export const LOGIN = gql`
  query getUserProfile($name: String!, $password: String!) {
    getUserProfile(name: $name, password: $password) {
        username
        email
        image
        about
        dob
        address
        country
        gender
        phoneno
        favorite
    }
  }
`;

export const GET_USER = gql`
  query getUserProfile($user_id: String!) {
    getUserProfile(user_id: $user_id) {
        username
        email
        image
        about
        dob
        address
        country
        gender
        phoneno
        favorite
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders($user_id: String!) {
    getOrders(user_id: $user_id) {
      orders{
        user_id
        price
        date
        products
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($product_id: String!) {
    getProduct(product_id: $product_id) {
        shop_id
        category
        count
        name
        image
        description
        price
        sell_count
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories($user_id: String!) {
    getCategories(user_id: $user_id) {
      categories{
        category_id
        name
        user_id
      }
    }
  }
`;

export const GET_SHOP_PRODUCTS = gql`
  query getShopProduct($shop_id: String!) {
    getShopProduct(shop_id: $shop_id) {
      products{
        shop_id
        category
        count
        name
        image
        description
        price
        sell_count
      }
    }
  }
`;

export const GET_SHOP = gql`
  query getShop($shop_id: String!) {
    getShop(shop_id: $shop_id) {
      user_id
      image
      name
    }
  }
`;

export const SHOPNAME_AVAILABILITY = gql`
  query getShopNameAvailability($name: String!) {
    getShopNameAvailability(name: $name) {
      isAvailable
    }
  }
`;



