const express = require("express");
const mongoose = require("mongoose");
const newUserR = require("./routes/newuser");
const loginU = require("./routes/login")
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.use(express.static('public'));

app.get("/", (req, res) => {
    const indexPagePath = __dirname + "/public/index.html";
    res.sendFile(indexPagePath);
});

app.use('/', newUserR);
app.use('/', loginU);

mongoose.connect("mongodb+srv://root:root12345678@globalmind.3krcaq3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
