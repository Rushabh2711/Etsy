import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation createUser(
    $email: String! 
    $password: String! 
    $username: String!
  ) {
    createUser(
      email: $email 
      password: $password 
      username: $username
      ) {
        username
      }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Float!
    $count: Float!
    $image: String!
    $shop_id: String!
    $category: String!
    $sell_count: Float!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      count: $count
      image: $image
      shop_id: $shop_id
      category: $category
      sell_count: $sell_count
    )
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct(
    $product_id: String!
    $name: String!
    $description: String!
    $price: Float!
    $count: Float!
    $image: String!
    $shop_id: String!
    $category: String!
    $sell_count: Float!
  ) {
    editProduct(
      product_id: $product_id
      name: $name
      description: $description
      price: $price
      count: $count
      image: $image
      shop_id: $shop_id
      category: $category
      sell_count: $sell_count
    ) {
      message
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $user_id: String!
    $username: String!
    $email: String!
    $password: String!
    $gender: String!
    $about: String!
    $address: String!
    $country: String!
    $city: String!
    $phoneno: String!
    $image: String!
  ) {
    editUser( user_id: $user_id, username: $username, email: $email,password: $password, gender: $gender,about: $about,address: $address,country: $country,city:$city,phone_number:$phone_number,customer_image: $customer_image)
  }
`;

export const ADD_SHOP = gql`
  mutation addShop($user_id: String!, $name: String!) {
    addShop(user_id: $usr_id, name: $name) {
      shop_id
    }
  }
`;

export const EDIT_SHOP = gql`
  mutation editShop(
    $shop_id: String!
    $name: String!
    $image: String!
  ) {
    editShop(shop_id: $shop_id, name: $name, image: $image) {
      shop_id
      name
      image
    }
  }
`;

export const ADD_ORDER = gql`
  mutation adOrder(
    $user_id: String!
    $products: [String]! 
    $price: Float! 
    $date: String!
    ) {
    createOrder(
      user_id: $user_id
      products: $products
      price: $price
      date: $date
      ) {
      id
    }
  }
`;
