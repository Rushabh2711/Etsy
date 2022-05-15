const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const User = require('../service/User');
const { UserType } = require("./schemas");

const mutation = new GraphQLObjectType({
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



module.exports = mutation;