const express = require("express");
require("./database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const imageUpload = require("./routes/imageUpload");
const schema = require("./graphql/config");
const { graphqlHTTP } = require("express-graphql");
const cors = require('cors');



const app = express();

app.use(express.json());

var corsOptions = {
    'origin': "http://localhost:3000",
    // 'origin': "http://34.230.84.195:3000",
    'Access-Control-Allow-Origin': '*',
    'credentials': 'true'
  };
  
app.use(cors(corsOptions));
// app.use(cors(configureCors()));
app.use(authRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(productRouter);
app.use(imageUpload);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

function configureCors() {
    const whitelist = [
      "http://localhost:3000",
      // "http://34.230.84.195:3000",
    ];
  
    const corsOptionsDelegate = (req, callback) => {
        console.log(req)

      let corsOptions;
  
      let isDomainAllowed = whitelist.indexOf(req.header("Origin")) !== -1;
  
      if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true };
      } else {
        // Disable CORS for this request
        corsOptions = { origin: false };
      }
      callback(null, corsOptions);
    };
  
    return corsOptionsDelegate;
  }

module.exports = app