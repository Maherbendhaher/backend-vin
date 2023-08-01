const express = require("express");
const cors = require("cors");
const auth=require("./app/controllers/auth.controller")

const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
  allowedHeaders: "Content-Type, Authorization"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
//app.use(createROLES)

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
auth.createAdmin()

// database
const db = require("./app/models");
const Role = db.role;

function createRole(Role)
{
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

//force: true //will drop the table if it already exists
//db.sequelize.sync({force: true}).then(() => {
  // console.log('Drop and Resync Database with { force: true }');
   //initial();
 //});
// db.sequelize.sync({force: true }).then(() => {
  //createRole(Role); // Appelez la fonction createRole ici pour créer les rôles
//});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome " });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
app.use(createRole)
// set port, listen for requests



const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


