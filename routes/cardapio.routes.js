module.exports = app => {
    const cardapios = require("../app/controllers/cardapio.controller.js"); 
    var router = require("express").Router(); 
    // Create a new Cardapio 
    router.post("/", cardapios.create); 
    // Retrieve all cardapios 
    router.get("/", cardapios.findAll); 
    // Retrieve a single Cardapio with id 
    router.get("/:id", cardapios.findOne); 
    // Update a Cardapio with id 
    router.put("/:id", cardapios.update); 
    // Delete a Cardapio with id 
    router.delete("/:id", cardapios.delete); 
    app.use('/api/cardapios', router); 
  }; 
