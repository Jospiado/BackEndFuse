module.exports = app => {
    const comandas = require("../app/controllers/comanda.controller.js"); 
    var router = require("express").Router(); 
    // Create a new Comanda 
    router.post("/", comandas.create); 
    // Retrieve all comandas 
    router.get("/", comandas.findAll); 
    // Retrieve a single Comanda with id 
    router.get("/:id", comandas.findOne); 
    // Update a Comanda with id 
    router.put("/:id", comandas.update); 
    // Delete a Comanda with id 
    router.delete("/:id", comandas.delete); 
    app.use('/api/comandas', router); 
  }; 
