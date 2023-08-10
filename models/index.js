const mongoose = require("mongoose"); 
mongoose.Promise = global.Promise; 
const db = {}; 
db.mongoose = mongoose; 

//Declara Cliente
db.clientes = require("./cliente.model.js")(mongoose); 

//Declara Usuario
db.usuarios = require("./usuario.model.js")(mongoose); 

//Declara CartaoDeConsumo
db.cartoesdeConsumo = require("./cartaoDeConsumo.model.js")(mongoose); 

//Declara Comanda
db.comandas = require("./comanda.model.js")(mongoose); 

//Declara ItemComanda
db.itensComanda = require("./itemComanda.model.js")(mongoose); 

//Declara Cardapio
db.cardapios = require("./cardapio.model.js")(mongoose); 


module.exports = db;
