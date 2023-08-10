const express = require("express");
const cors = require("cors"); 
const app = express();

var corsOptions = { 
  origin: "http://localhost:4200" 
}; 

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.a3mav.mongodb.net/curso-javascript?retryWrites=true&w=majority'); 

// simple route
app.get("/", (req, res) => { 
  res.json({ message: "Welcome to application." }); 
}); 

//Declara Cliente rotas
require("./routes/cliente.routes")(app); 

//Declara Usuario rotas
require("./routes/usuario.routes")(app); 

//Declara CartaoDeConsumo rotas
require("./routes/cartaoDeConsumo.routes")(app); 

//Declara Comanda rotas
require("./routes/comanda.routes")(app); 

//Declara ItemComanda rotas
require("./routes/itemComanda.routes")(app); 

//Declara Cardapio rotas
require("./routes/cardapio.routes")(app); 

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});
