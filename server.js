const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://shivaniraghuwanshi4647_db_user:oIfWtBJPbRNkpVWG@cluster0.9toqlix.mongodb.net/saferoute?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/test", (req, res) => {
    res.send("Server Working");
});

const authRoutes = require("./routes/authRoutes");
const sosRoutes = require("./routes/sosRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});