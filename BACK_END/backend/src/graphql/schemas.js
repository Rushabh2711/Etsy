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
    // dob: {type: Date},
    address: { type: GraphQLString },
    country: { type: GraphQLString },
    gender: { type: GraphQLString },
    phoneno: { type: GraphQLString },
    favorite: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = {
  UserType,
};
