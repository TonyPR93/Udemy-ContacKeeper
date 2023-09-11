const express = require("express"); //on appel express
const connectDB = require("./config/db");

const app = express();

//Connect database
connectDB();
app.get("/", (req, res) => res.send("Hello world"));

//Les routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serveur started on ${PORT}`));
