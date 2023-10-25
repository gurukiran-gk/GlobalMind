const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require("mongoose");
const newUserR = require("./routes/newuser");
const loginU = require("./routes/login")
const newservice = require("./routes/newservice")
const service = require("./routes/services")
app.use(express.urlencoded({ extended: true }));
const port = 3000;


app.set('view engine', 'handlebars');

app.engine('handlebars',exphbs({extname: '.handlebars', defaultLayout: 'main',layoutsDir: path.join(__dirname, 'views/'),allowProtoPropertiesByDefault: true,  }));

app.use(express.static('public'));

app.get("/", (req, res) => {
    const indexPagePath = __dirname + "/public/index.html";
    res.sendFile(indexPagePath);
});

app.use('/', newUserR);
app.use('/', loginU);
app.use('/', newservice);
app.use('/',service);

mongoose.connect("mongodb+srv://root:root12345678@globalmind.3krcaq3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

