const app = require("./app");

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('server is up and running on port ' + port);
})