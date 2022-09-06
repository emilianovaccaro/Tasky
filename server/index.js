const path = require('path');
const express = require('express');
const connectDb = require('./config/database');
const PORT = process.env.PORT || 5000;

const dotenv = require('dotenv').config();

connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ROUTES
app.use("/api/task", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));



// FRONTEND BUILD
/* 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'carpetafrontend/build')));

  app.get('*', (req, res) => res.sendFile(
    path.resolve(__dirname, '../', 'carpetafrontend', 'build', 'index.html');
  ));
} else {
  app.get('/', (req, res) => res.send("Please set env to production"));
}
*/


//middlewares and error handlers


app.listen(PORT, () => {
  console.log(`server active, port: ${PORT}`);
})
