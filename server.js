const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the App" }));

// Define Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.use("/api/stockfeed", require("./routes/stockfeed"));

// app.use("/api/stockfeed/:id/like", require("./routes/stockfeed"));
// app.use("/api/stockfeed/:id/unlike", require("./routes/stockfeed"));
// app.use("/api/stockfeed/:id/comment", require("./routes/stockfeed"));

app.use("/api/userprofile", require("./routes/userprofile"));
app.use("/api/stocktok", require("./routes/stocktok"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
