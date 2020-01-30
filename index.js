const app = require("express")();

//db
require("./startups/db")();

//routes
require("./startups/routes")(app);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`running at port ${port}...`))
