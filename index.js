const express = require("express");
const PORT = 8000;
const app = express();

//view engine
app.set("view engine", "ejs");

//listening on port
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})