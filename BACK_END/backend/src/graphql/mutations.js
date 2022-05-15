const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql;
const User = require('../service/User');
const Product = require('../service/Product');
const { UserType, ProductType } = require("./schemas");

const addUSerMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args);
        try {
          await User.registerUser(
            {email: args.email,
              password: args.password,
              username:args.username}
          );
        } catch (error) {
          console.log(error);
        }
        return { message: "User Added Successfully",
       };
      },
    },
  },
});

const addProductMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        shop_id: { type: GraphQLString }, 
        category: { type: GraphQLString }, 
        count: { type: GraphQLFloat },
        name: { type: GraphQLString }, 
        image: { type: GraphQLString }, 
        description:{ type: GraphQLString }, 
        price: { type: GraphQLFloat },  
        sell_count: { type: GraphQLFloat }
      },
      async resolve(parent, args) {
        console.log(args);
        try {
          await Product.addProduct(
            {...args}
          );
        } catch (error) {
          console.log(error);
        }
        return { message: "Product Added Successfully",
       };
      },
    },
  },
})



module.exports = addUSerMutation;