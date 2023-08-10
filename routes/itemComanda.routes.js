module.exports = app => {
    const itensComanda = require("../app/controllers/itemComanda.controller.js"); 
    var router = require("express").Router(); 
    // Create a new ItemComanda 
    router.post("/", itensComanda.create); 
    // Retrieve all itensComanda 
    router.get("/", itensComanda.findAll); 
    // Retrieve a single ItemComanda with id 
    router.get("/:id", itensComanda.findOne); 
    // Update a ItemComanda with id 
    router.put("/:id", itensComanda.update); 
    // Delete a ItemComanda with id 
    router.delete("/:id", itensComanda.delete); 
    app.use('/api/itensComanda', router); 
  }; 
