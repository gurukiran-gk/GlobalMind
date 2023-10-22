const express = require("express");
const mongoose = require("mongoose");
const newUserR = require("./routes/newuser");
const loginU = require("./routes/login")
const newservice = require("./routes/newservice")
const service = require("./routes/services")
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const exphbs = require('express-handlebars');
const path = require('path');
app.engine('handlebars', exphbs({ defaultLayout: 'admin1' }));

app.set('view engine', 'handlebars');

app.engine(
  'handlebars',
  exphbs({
    extname: '.handlebars', // Set the file extension for Handlebars templates
    defaultLayout: 'admin1', // Specify the default layout
    layoutsDir: path.join(__dirname, 'views/'), // Path to the layouts directory
  })
);

app.use(express.static('public'));
app.use(express.static('public2'));

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
