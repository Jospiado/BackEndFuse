module.exports = app => {
    const cartoesdeConsumo = require("../app/controllers/cartaoDeConsumo.controller.js"); 
    var router = require("express").Router(); 
    // Create a new CartaoDeConsumo 
    router.post("/", cartoesdeConsumo.create); 
    // Retrieve all cartoesdeConsumo 
    router.get("/", cartoesdeConsumo.findAll); 
    // Retrieve a single CartaoDeConsumo with id 
    router.get("/:id", cartoesdeConsumo.findOne); 
    // Update a CartaoDeConsumo with id 
    router.put("/:id", cartoesdeConsumo.update); 
    // Delete a CartaoDeConsumo with id 
    router.delete("/:id", cartoesdeConsumo.delete); 
    app.use('/api/cartoesdeConsumo', router); 
  }; 
