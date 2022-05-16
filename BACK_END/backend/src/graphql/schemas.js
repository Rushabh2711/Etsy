const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    image: { type: GraphQLString },
    about: { type: GraphQLString },
    address: { type: GraphQLString },
    country: { type: GraphQLString },
    gender: { type: GraphQLString },
    phoneno: { type: GraphQLString },
    favorite: { type: new GraphQLList(GraphQLString) },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    user_id: { type: GraphQLString },
    price:  { type: GraphQLFloat },
    date:  { type: GraphQLString },
    products: [{ type: GraphQLString }],
  }),
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    shop_id: { type: GraphQLString }, 
    category: { type: GraphQLString }, 
    count: { type: GraphQLFloat },
    name: { type: GraphQLString }, 
    image: { type: GraphQLString }, 
    description:{ type: GraphQLString }, 
    price: { type: GraphQLFloat },  
    sell_count: { type: GraphQLFloat }
  }),
});

const ShopType = new GraphQLObjectType({
  name: "Shop",
  fields: () => ({
    user_id: { type: GraphQLString },
    image: { type: GraphQLString },
    name: { type: GraphQLString }
  }),
});

const categoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    category_id: { type: GraphQLString },
    name: { type: GraphQLString },
    user_id: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getRestaurant: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        // const res = await RestaurantService.getRestaurantInfo(args.id);
        return res.restaurant;
      },
    },
  },
});

module.exports = {
  UserType,
  OrderType,
  ProductType,
  ShopType,
  categoryType
};
